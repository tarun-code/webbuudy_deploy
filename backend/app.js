import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// import path from "path";
config({
  path: "./config/config.env",
});
const app = express();

// Using Middlewares

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Importing & Using Routes
import projects from "./routes/projectRoutes.js";
import user from "./routes/userRoutes.js";
import gallery from "./routes/galleryRoutes.js";

import services from "./routes/servicesRoutes.js";
import testimonial from "./routes/testimonialRoutes.js";
import blog from "./routes/blogRoutes.js";
import contact from "./routes/contactRoutes.js";
import news from "./routes/newsRoutes.js";

app.use("/api/v1", projects);
app.use("/api/v1", user);
app.use("/api/v1", gallery);
app.use("/api/v1", contact);
app.use("/api/v1", services);
app.use("/api/v1", testimonial);
app.use("/api/v1", blog);

app.use("/api/v1", news);

export default app;

// app.use(express.static(path.resolve("../webbuddy/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve("../webbuddy/build/index.html"));
// });

// app.get("/", (req, res) =>
//   res.send(
//     `<h1>Site is Working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
//   )
// );

app.use(ErrorMiddleware);
