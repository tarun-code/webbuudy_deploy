import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Contact } from "../models/contact.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createContact = catchAsyncError(async (req, res, next) => {
  const { name, email, number, subject, query } = req.body;

  if (!name || !email || !number || !subject || !query) {
    return next(new ErrorHandler("All fields are mandatory", 400));
  }
  await Contact.create({
    name,
    email,
    number,
    subject,
    query,
  });

  const to = process.env.MY_MAIL;
  const Subject = "Contact from Tarun Shori PortFolio";
  const text = `I am ${name} and my Email is ${email}. \n${query}`;

  await sendEmail(to, Subject, text);

  res.status(200).json({
    success: true,
    message: "Your Message Has Been Sent.",
  });
});

export const deleteContact = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const conatct = await Contact.findById(id);

  if (!conatct) return next(new ErrorHandler("Conatct not found", 404));

  await conatct.remove();

  res.status(200).json({
    success: true,
    message: "Conatct Deleted Successfully",
  });
});

export const getAllContacts = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword || "";
  const category = req.query.category || "";

  const contacts = await Contact.find({
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
    contacts,
  });
});
