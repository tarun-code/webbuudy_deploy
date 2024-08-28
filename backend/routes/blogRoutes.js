import express from "express";
import {
  createBlog,
  createComment,
  deleteBlog,
  deleteComment,
  getAllBlog,
  getAllComment,
  getBlog,
  updateBlog,
} from "../controllers/blogController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// post routes

router.route("/posts").get(getAllBlog);

// admin routes

router
  .route("/addpost")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createBlog);

router
  .route("/post/:id")

  .delete(isAuthenticated, authorizeAdmin, deleteBlog)
  .put(isAuthenticated, authorizeAdmin, singleUpload, updateBlog)
  .get(getBlog);

// comment routes

router.route("/comments/:id").get(getAllComment);
router.route("/addcomment/:id").post(createComment);

// blogId, commentId
router
  .route("/deletecomment/:blogId/:commentId")

  .delete(isAuthenticated, authorizeAdmin, deleteComment);

export default router;
