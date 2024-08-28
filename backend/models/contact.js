import mongoose from "mongoose";
import validator from "validator";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    // unique: false,
    validate: validator.isEmail,
  },
  number: {
    type: Number,
    required: [true, "Please enter mobile"],
  },

  subject: {
    type: String,
    required: [true, "Please enter subject"],
  },
  query: {
    type: String,
    required: [true, "Please enter message"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Contact = mongoose.model("Contact", schema);
