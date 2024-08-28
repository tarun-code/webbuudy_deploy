import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Project } from "../models/project.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

export const getAllProjects = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword || "";
  const category = req.query.category || "";

  const projects = await Project.find({
    title: {
      $regex: keyword,
      $options: "i",
    },
    category: {
      $regex: category,
      $options: "i",
    },
  });
  res.status(200).json({
    success: true,
    projects,
  });
});

export const createProject = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;
  const file = req.file;

  if (!title || !description || !category || !createdBy || !file)
    return next(new ErrorHandler("Please add all fields", 400));

  const fileUri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await Project.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Project Created Successfully.",
  });
});

export const deleteProject = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const project = await Project.findById(id);

  if (!project) return next(new ErrorHandler("Project not found", 404));

  await cloudinary.v2.uploader.destroy(project.poster.public_id);

  await project.remove();

  res.status(200).json({
    success: true,
    message: "Project Deleted Successfully",
  });
});

export const updateProject = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;
  const file = req.file;
  const { id } = req.params;

  if (!title || !description || !category || !createdBy || !file)
    return next(new ErrorHandler("Please Fill all fields", 400));

  const project = await Project.findById(id);

  if (!project) return next(new ErrorHandler("Project not found", 404));
  const fileUri = getDataUri(file);
  await cloudinary.v2.uploader.destroy(project.poster.public_id);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  project.poster = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };
  project.title = title;
  project.description = description;
  project.category = category;
  project.createdBy = createdBy;
  await project.save();

  res.status(200).json({
    success: true,
    message: "Project Updated Successfully",
  });
});
