import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Gallery } from "../models/gallery.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

export const getAllGallery = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword || "";
  const category = req.query.category || "";

  const gallery = await Gallery.find({
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
    gallery,
  });
});

export const createGallery = catchAsyncError(async (req, res, next) => {
  const { title, category } = req.body;
  const file = req.file;
  if (!title || !category || !file)
    return next(new ErrorHandler("Please add all fields", 400));

  const fileUri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await Gallery.create({
    title,

    category,

    poster: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Gallery Created Successfully.",
  });
});

export const deleteGallery = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const gallery = await Gallery.findById(id);

  if (!gallery) return next(new ErrorHandler("Image not found", 404));

  await cloudinary.v2.uploader.destroy(gallery.poster.public_id);

  await gallery.remove();

  res.status(200).json({
    success: true,
    message: "Gallery Deleted Successfully",
  });
});

export const updateGallery = catchAsyncError(async (req, res, next) => {
  const { title, category } = req.body;
  const file = req.file;
  const { id } = req.params;
  if (!title || !category || !file)
    return next(new ErrorHandler("Please add all fields", 400));

  const gallery = await Gallery.findById(id);

  if (!gallery) return next(new ErrorHandler("Image not found", 404));
  const fileUri = getDataUri(file);
  await cloudinary.v2.uploader.destroy(gallery.poster.public_id);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  gallery.poster = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };
  gallery.title = title;

  gallery.category = category;

  await gallery.save();

  res.status(200).json({
    success: true,
    message: "Gallery Updated Successfully",
  });
});
