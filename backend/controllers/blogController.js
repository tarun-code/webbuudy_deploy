import { Blog } from "../models/blog.js";

import { catchAsyncError } from "../middlewares/catchAsyncError.js";

import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

export const getAllBlog = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword || "";
  const category = req.query.category || "";

  const blogs = await Blog.find({
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
    blogs,
  });
});

export const createBlog = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;
  const file = req.file;
  
  if (!title || !description || !createdBy || !category || !file)
    return next(new ErrorHandler("Please add all fields", 400));

  const fileUri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await Blog.create({
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
    message: "Blog Created Successfully.",
  });
});

export const deleteBlog = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);

  if (!blog) return next(new ErrorHandler("Blog not found", 404));

  await cloudinary.v2.uploader.destroy(blog.poster.public_id);

  await blog.remove();

  res.status(200).json({
    success: true,
    message: "Blog Deleted Successfully",
  });
});

export const updateBlog = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;
  const file = req.file;
  const { id } = req.params;

  if (!title || !description || !createdBy || !category || !file)
    return next(new ErrorHandler("Please Fill all fields", 400));

  const blog = await Blog.findById(id);

  if (!blog) return next(new ErrorHandler("Blog not found", 404));
  const fileUri = getDataUri(file);
  await cloudinary.v2.uploader.destroy(blog.poster.public_id);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  blog.poster = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };
  blog.title = title;
  blog.description = description;
  blog.category = category;
  blog.createdBy = createdBy;
  await blog.save();

  res.status(200).json({
    success: true,
    message: "Blog Updated Successfully",
  });
});

export const getBlog = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);

  if (!blog) return next(new ErrorHandler("Blog not found", 404));

  res.status(200).json({
    success: true,
    blog,
  });
});

// comments controller start here

export const getAllComment = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);

  if (!blog) return next(new ErrorHandler("Post not found", 404));

  res.status(200).json({
    success: true,
    comments: blog.comments,
  });
});

export const createComment = catchAsyncError(async (req, res, next) => {
  const { name, comment } = req.body;

  const { id } = req.params;

  if (!name || !comment)
    return next(new ErrorHandler("Please add all fields", 400));
  const blog = await Blog.findById(id);
  if (!blog) return next(new ErrorHandler("Post Not Found", 400));

  blog.comments.push({
    name,
    comment,
  });

  await blog.save();

  res.status(201).json({
    success: true,
    message: "Comment Send Successfully.",
  });
});

export const deleteComment = catchAsyncError(async (req, res, next) => {
  const { blogId, commentId } = req.params;

  const blog = await Blog.findById(blogId);
  if (!blog) return next(new ErrorHandler("Post not found", 404));

  blog.comments = blog.comments.filter((item) => {
    if (item._id.toString() !== commentId.toString()) return item;
  });

  await blog.save();

  res.status(200).json({
    success: true,
    message: "Comment Deleted Successfully",
  });
});

// update comment

// export const updatecomment = catchAsyncError(async (req, res, next) => {

//   res.status(200).json({
//     success: true,
//     message: "Comment Updated Successfully",
//   });
// });

// get comment

// export const getcomment = catchAsyncError(async (req, res, next) => {

//   res.status(200).json({
//     success: true,

//   });
// });
