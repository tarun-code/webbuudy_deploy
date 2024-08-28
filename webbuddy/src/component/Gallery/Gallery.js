import React from "react";
import "./Gallery.css";
import Card from "./Card";
// import Portfolio_data from "./Portfolio_data";
import { getAllGallery } from "../Redux/actions/gallery";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Gallery = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGallery());
  }, [dispatch]);
  const { gallery } = useSelector((state) => state.gallery);

  return (
    <>
      <section className="Portfolio top" id="gallery">
        <div className="container">
          <div className="heading text-center ">
            <h4>VISIT MY GALLERY AND KEEP YOUR FEEDBACK</h4>
            <h1>My Gallery</h1>
          </div>

          <div className="content grid">
            {gallery &&
              gallery.map((value) => {
                return (
                  <Card
                    key={value._id}
                    poster={value.poster}
                    category={value.category}
                    title={value.title}
                  />
                );
              })}

            {/*<div className='box btn_shadow '>
              <div className='img'>
                  <img src='https://rainbowit.net/html/inbio/assets/images/portfolio/portfolio-01.jpg' alt='' />
              </div>
              <div className='category d_flex'>
                  <span>Development</span>
                  <label>
                    <i className='far fa-heart'></i> 360
                  </label>
              </div>
              <div className='title'>
                  <h2>Mobile app landing design & Services</h2>
                <a href='' className='arrow'>
                  <i class='fas fa-arrow-right'></i>
                </a>
              </div>
            </div>*/}
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;
