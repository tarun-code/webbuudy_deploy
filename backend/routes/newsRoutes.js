import express from "express";
import {
  createNews,
  deleteNews,
  getAllNews,
} from "../controllers/newsController.js";

import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// contact form
router.route("/createnews").post(createNews);

router
  .route("/deletenews/:id")
  .delete(isAuthenticated, authorizeAdmin, deleteNews);
router.route("/news").get(isAuthenticated, authorizeAdmin, getAllNews);
export default router;
