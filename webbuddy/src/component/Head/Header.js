import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./header.css";

import Features from "../Features/Features";
import Home from "../Hero/Home";
import Portfolio from "../Portfolio/Portfolio";
import Resume from "../Resume/Resume";
import Testimonial from "../Testimonial/Testimonial";
import Blog from "..//Blog/Blog";
import Contact from "../Contact/Contact";
import Footer from "../Footer";
import Gallery from "../Gallery/Gallery";
import News from "../newslletter/News";
import { Tooltip } from "@mui/material";

const Header = () => {
  const navigate = useNavigate();

  // fixed Header
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    header.classList.toggle("active", window.scrollY > 100);
  });
  // Toogle Menu
  const [Mobile, setMobile] = useState(false);

  // logo js

  return (
    <>
      <header className="header">
        <div className="container d_flex">
          <div className="logo">
            {/* <img src={logo} alt='' /> */}
            <div className="logo-holder logo-4">
              <a href="/">
                <h3>WebBuddy</h3>
                <p>Logically Minded</p>
              </a>
            </div>
            {/* <h3>Tarun Shori</h3> */}
          </div>

          <div className="navlink">
            <ul
              className={Mobile ? "nav-links-mobile" : "link f_flex uppercase"}
              onClick={() => setMobile(false)}
            >
              {/*<ul className='link f_flex uppercase {Mobile ? "nav-links-mobile" : "nav-links"} onClick={() => setMobile(false)}'>*/}
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#portfolio">Portfolio</a>
              </li>
              <li>
                <a href="#resume">Resume</a>
              </li>
              <li>
                <a href="#clients">Clients</a>
              </li>
              <li>
                <a href="#gallery">Gallery</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <Tooltip title="Only For Admin" sx={{ mt: 1 }}>
                  <button
                    onClick={() => navigate("/login")}
                    className="home-btn"
                  >
                    SIGN IN
                  </button>
                </Tooltip>
              </li>
            </ul>

            <button className="toggle" onClick={() => setMobile(!Mobile)}>
              {Mobile ? (
                <i className="fas fa-times close home-btn"></i>
              ) : (
                <i className="fas fa-bars open"></i>
              )}
            </button>
          </div>
        </div>
      </header>

      <Home />
      <Features />
      <Portfolio />
      <Resume />
      <Testimonial />
      <Gallery />
      <Blog />

      <Contact />
      <News />
      <Footer />
    </>
  );
};

export default Header;
