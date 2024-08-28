import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Services } from "../models/services.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

export const getAllServices = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword || "";
  const category = req.query.category || "";

  const services = await Services.find({
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
    services,
  });
});

export const createservice = catchAsyncError(async (req, res, next) => {
  const { title, description } = req.body;
  const file = req.file;
  if (!title || !description || !file)
    return next(new ErrorHandler("Please add all fields", 400));

  const fileUri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await Services.create({
    title,
    description,
  
    image: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Service Created Successfully.",
  });
});

export const deleteService = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const services = await Services.findById(id);

  if (!services) return next(new ErrorHandler("Project not found", 404));

  await cloudinary.v2.uploader.destroy(services.image.public_id);

  await services.remove();

  res.status(200).json({
    success: true,
    message: "Service Deleted Successfully",
  });
});




export const updateService = catchAsyncError(async (req, res, next) => {
  const { title, description} = req.body;
  const file = req.file;
  const { id } = req.params;

  if (!title || !description || !file)
    return next(new ErrorHandler("Please add all fields", 400));

  const services = await Services.findById(id);

  if (!services) return next(new ErrorHandler("Project not found", 404));
  const fileUri = getDataUri(file);
  await cloudinary.v2.uploader.destroy(services.image.public_id);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  services.image = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };
  services.title = title;
  services.description = description;

  await services.save();

  res.status(200).json({
    success: true,
    message: "Service Updated Successfully",
  });
});

