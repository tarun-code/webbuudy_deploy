import express from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
} from "../controllers/projectController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

router.route("/projects").get(getAllProjects);

// admin routes
router
  .route("/createproject")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createProject);

router
  .route("/project/:id")

  .delete(isAuthenticated, authorizeAdmin, deleteProject)
  .put(isAuthenticated, authorizeAdmin, singleUpload, updateProject);

export default router;
