import express from "express";
import { createGallery, deleteGallery, getAllGallery, updateGallery } from "../controllers/galleryController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

router.route("/gallery").get(getAllGallery);


// admin routes
router
  .route("/addgallery")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createGallery);

router
  .route("/gallery/:id")

  .delete(isAuthenticated, authorizeAdmin,deleteGallery ).put(isAuthenticated, authorizeAdmin, singleUpload,updateGallery )

export default router;
