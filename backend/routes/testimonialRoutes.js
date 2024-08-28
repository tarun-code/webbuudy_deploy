import express from "express";
import {
  createTestimonial,
  deleteTestimonial,
  getAllTestimonials,
  updateTestimonial,
} from "../controllers/testimonialController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

router.route("/testimonials").get(getAllTestimonials);

// admin routes

router
  .route("/createtestimonial")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createTestimonial);

router
  .route("/testimonial/:id")

  .delete(isAuthenticated, authorizeAdmin, deleteTestimonial)
  .put(isAuthenticated, authorizeAdmin, singleUpload, updateTestimonial);

export default router;
