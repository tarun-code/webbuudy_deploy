import React, { useEffect } from "react";
import "./Features.css";
// import data from "./Features-Api";
import Card from "./Card";
import { getAllServices } from "../Redux/actions/services";
import { useDispatch, useSelector } from "react-redux";

const Features = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  const { services } = useSelector((state) => state.service);

  return (
    <>
      <section className="features top" id="features">
        <div className="container">
          <div className="heading">
            <h4>Features</h4>
            <h1>What I Do</h1>
          </div>

          {/* icons download here */}
          {/* https://icons8.com/icon/set/services/material */}
          <div className="content grid">
            {services &&
              services.map((val) => {
                return (
                  <Card
                    key={val._id}
                    image={val.image}
                    title={val.title}
                    description={val.description}
                  />
                );
              })}

            {/*<div className='box btn_shadow'>
              <img src='https://img.icons8.com/glyph-neue/64/000000/polyline.png' alt='' />
              <h2>Personal Portfolio April</h2>
              <p>It uses a dictionary of over 200 Latin words, combined with a handful of model sentence.</p>
              <a href=''>
                <i class='fas fa-arrow-right'></i>
              </a>
            </div>*/}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
