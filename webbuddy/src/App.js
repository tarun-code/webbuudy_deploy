import React, { useEffect } from "react";

import { Route, Routes } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Header from "./component/Head/Header";

import Loader from "./component/Loader/Loader";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Login from "./component/Login/Login";

import AdminApp from "./admin/AdminApp";

import Dashboard from "./admin/Components/BodyComponent/Dashboard/Dashboard";
import ServicesComponent from "./admin/Components/BodyComponent/ServicesComponent";
import ProjectsComponent from "./admin/Components/BodyComponent/ProjectsComponent";
import AboutComponent from "./admin/Components/BodyComponent/AboutComponent";
import ContactsComponent from "./admin/Components/BodyComponent/ContactsComponent";
import NewsletterComponent from "./admin/Components/BodyComponent/NewsletterComponent";
import GalleryComponent from "./admin/Components/BodyComponent/GalleryComponent";
import BlogComponent from "./admin/Components/BodyComponent/BlogComponent";

import TestimonialsComponent from "./admin/Components/BodyComponent/TestimonialsComponent";
import { loadUser } from "./component/Redux/actions/user";
import NotFound from "./component/Not Found/NotFound";

const App = () => {
  // window.addEventListener("contextmenu", (e) => {
  //   e.preventDefault();
  // });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.user);

  
  const loading = false;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Header />}></Route>
            <Route path="*" element={<NotFound />} />
            <Route
              path="/admin"
              element={isAuthenticated ? <AdminApp /> : <Login />}
            >
              <Route
                index
                element={isAuthenticated ? <Dashboard /> : <Login />}
              ></Route>
              <Route
                exact
                path="dashboard"
                element={isAuthenticated ? <Dashboard /> : <Login />}
              ></Route>
              <Route
                exact
                path="blogs"
                element={isAuthenticated ? <BlogComponent /> : <Login />}
              ></Route>
              <Route
                exact
                path="services"
                element={isAuthenticated ? <ServicesComponent /> : <Login />}
              ></Route>
              <Route
                exact
                path="projects"
                element={isAuthenticated ? <ProjectsComponent /> : <Login />}
              ></Route>
              <Route
                exact
                path="about"
                element={isAuthenticated ? <AboutComponent /> : <Login />}
              ></Route>
              <Route
                exact
                path="contacts"
                element={isAuthenticated ? <ContactsComponent /> : <Login />}
              ></Route>
              <Route
                exact
                path="testimonials"
                element={
                  isAuthenticated ? <TestimonialsComponent /> : <Login />
                }
              ></Route>
              <Route
                exact
                path="newsletter"
                element={isAuthenticated ? <NewsletterComponent /> : <Login />}
              ></Route>
              <Route
                exact
                path="gallery"
                element={isAuthenticated ? <GalleryComponent /> : <Login />}
              ></Route>
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
          <Toaster />
        </>
      )}
    </>
  );
};

export default App;
