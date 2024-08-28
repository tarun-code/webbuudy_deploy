import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { News } from "../models/news.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createNews = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  if (!email) return next(new ErrorHandler("All fields are mandatory", 400));

  await News.create({
    email,
  });

  const to = process.env.MY_MAIL;
  const subject = "Requesting For A News Letter From Tarun Shori Portfolio";
  const text = `Hello Tarun My Email Is ${email}. \n And I Want To Connect With  Your Website. `;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your Request Has Been Sent.",
  });
});

export const deleteNews = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const news = await News.findById(id);

  if (!news) return next(new ErrorHandler("NewsLetter not found", 404));

  await news.remove();

  res.status(200).json({
    success: true,
    message: "NewsLetter  Deleted Successfully",
  });
});

export const getAllNews = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword || "";
  const category = req.query.category || "";

  const news = await News.find({
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
    news,
  });
});
