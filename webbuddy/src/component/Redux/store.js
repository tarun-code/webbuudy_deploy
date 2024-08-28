import { configureStore } from "@reduxjs/toolkit";
import { blogReducer } from "./reducers/blogReducer";
import { contactReducer } from "./reducers/contactReducer";
import { galleryReducer } from "./reducers/galleryReducer";
import { newsReducer } from "./reducers/newsReducer";
import { projectReducer } from "./reducers/projectReducer";
import { servicesReducer } from "./reducers/servicesReducer";
import { testimonialReducer } from "./reducers/testimonialReducer";
import { profileReducer, userReducer } from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    testimonial: testimonialReducer,
    service: servicesReducer,
    project: projectReducer,
    gallery: galleryReducer,
    blog: blogReducer,
    contact: contactReducer,
    news: newsReducer,
  },
});
export default store;

export const server = "http://localhost:4000/api/v1";
