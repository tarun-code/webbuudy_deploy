import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter title"],
    minLength: [4, "Title must be at least 4 characters"],
    maxLength: [80, "Title can't exceed 80 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter  description"],
    minLength: [20, "Description must be at least 20 characters"],
  },

  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  category: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: [true, "Enter Blog Creator Name"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  comments: [
    {
      name: {
        type: String,
        required: [true, "Enter Your Name"],
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },
      comment: {
        type: String,
        required: [true, "Enter your Comment"],
      },
    },
  ],
});

export const Blog = mongoose.model("Blog", Schema);
