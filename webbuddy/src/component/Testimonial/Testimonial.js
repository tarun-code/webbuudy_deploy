import React, { useState, useEffect } from "react";
import "./Testimonial.css";
import Slide from "./Slide";
// import TestimonialApi from "./TestimonialApi";

import { getAllTestimonials } from "../Redux/actions/testimonial";
import { useDispatch, useSelector } from "react-redux";

const Testimonial = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTestimonials());
  }, [dispatch]);

  const { testimonials } = useSelector((state) => state.testimonial);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = testimonials?.length - 1;

    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, testimonials]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => clearInterval(slider);
  }, [index]);

  return (
    <>
      <section className="Testimonial" id="clients">
        <div className="container">
          <div className="heading text-center">
            <h4>WHAT CLIENTS SAY</h4>
            <h1>Testimonial</h1>
          </div>
          <div className="slide">
            {/*{TestimonialApi.map((val, index) => {
              return <Slide key={index} image={val.image} design={val.design} name={val.name} offcer={val.offcer} post={val.post} date={val.date} desc={val.desc} />
            })}*/}

            {testimonials &&
              testimonials.map((value, valueIndex) => {
                return (
                  <Slide
                    key={value._id}
                    {...value}
                    valueIndex={valueIndex}
                    index={index}
                    // id={value._id}
                  />
                );
              })}

            <div className="slide_button">
              <button
                className="btn_shadow prev_btn"
                onClick={() => setIndex(index - 1)}
              >
                <i class="fas fa-arrow-left"></i>
              </button>
              <button
                className="btn_shadow next_btn"
                onClick={() => setIndex(index + 1)}
              >
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonial;

