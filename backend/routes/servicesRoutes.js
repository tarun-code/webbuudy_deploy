import express from "express";
import {
  createservice,
  deleteService,
  getAllServices,
  updateService,
} from "../controllers/servicesController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

router.route("/services").get(getAllServices);

// admin routes
router
  .route("/createservice")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createservice);

router
  .route("/service/:id")

  .delete(isAuthenticated, authorizeAdmin, deleteService)
  .put(isAuthenticated, authorizeAdmin, singleUpload, updateService);

export default router;
