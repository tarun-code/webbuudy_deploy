import mongoose from "mongoose";
import validator from "validator";
const schema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter your email"],

    validate: validator.isEmail,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const News = mongoose.model("News", schema);
