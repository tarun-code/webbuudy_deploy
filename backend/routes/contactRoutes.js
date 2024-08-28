import express from "express";
import {
  createContact,
  deleteContact,
  getAllContacts,
} from "../controllers/contactController.js";

import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// contact form
router.route("/createcontact").post(createContact);

router
  .route("/deletecontact/:id")
  .delete(isAuthenticated, authorizeAdmin, deleteContact);
router.route("/contacts").get(isAuthenticated, authorizeAdmin, getAllContacts);

export default router;
