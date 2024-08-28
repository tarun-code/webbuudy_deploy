import mongoose from "mongoose";

const schema = new mongoose.Schema({
  post: {
    type: String,
    required: [true, "Please enter post"],
  },

  from: {
    type: String,
    required: [true, "Please enter belong from"],
  },

  name: {
    type: String,
    required: [true, "Please enter name"],
  },
  comment: {
    type: String,
    required: [true, "Please enter Comment"],
    minLength: [20, "Comment must be at least 20 characters"],
  },

  image: {
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

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Testimonials = mongoose.model("Testimonials", schema);
