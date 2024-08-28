import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Testimonials } from "../models/testimonial.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

export const getAllTestimonials = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword || "";
  const category = req.query.category || "";

  const testimonials = await Testimonials.find({
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
    testimonials,
  });
});

export const createTestimonial = catchAsyncError(async (req, res, next) => {
  const { name, comment, post, from, category } = req.body;
  const file = req.file;

  if (!post || !category || !from || !file || !name || !comment)
    return next(new ErrorHandler("Please add all fields", 400));

  const fileUri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await Testimonials.create({
    name,
    comment,
    post,
    category,
    from,
    image: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Testimonial Created Successfully.",
  });
});

export const deleteTestimonial = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const testimonials = await Testimonials.findById(id);

  if (!testimonials)
    return next(new ErrorHandler("Testimonial not found", 404));

  await cloudinary.v2.uploader.destroy(testimonials.image.public_id);

  await testimonials.remove();

  res.status(200).json({
    success: true,
    message: "Testimonial Deleted Successfully",
  });
});

export const updateTestimonial = catchAsyncError(async (req, res, next) => {
  const { name, comment, post, from, category } = req.body;
  const file = req.file;

  const { id } = req.params;
  if (!name || !comment || !post || !from || !category || !file)
    return next(new ErrorHandler("Please add all fields", 400));

  const testimonials = await Testimonials.findById(id);

  if (!testimonials)
    return next(new ErrorHandler("Testimonial not found", 404));
  const fileUri = getDataUri(file);
  await cloudinary.v2.uploader.destroy(testimonials.image.public_id);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  testimonials.image = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };
  testimonials.name = name;
  testimonials.comment = comment;
  testimonials.post = post;
  testimonials.from = from;
  testimonials.category = category;

  await testimonials.save();

  res.status(200).json({
    success: true,
    message: "Testimonial Updated Successfully",
  });
});
