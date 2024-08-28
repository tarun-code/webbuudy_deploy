import React from "react";
import "./Portfolio.css";
import Card from "./Card";
// import Portfolio_data from "./Portfolio_data";
import { getAllProject } from "../Redux/actions/project";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Portfolio = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProject());
  }, [dispatch]);

  const { projects } = useSelector((state) => state.project);

  return (
    <>
      <section className="Portfolio top" id="portfolio">
        <div className="container">
          <div className="heading text-center ">
            <h4>VISIT MY PORTFOLIO AND KEEP YOUR FEEDBACK</h4>
            <h1>My Portfolio</h1>
          </div>

          <div className="content grid">
            {projects &&
              projects.map((value, index) => {
                return (
                  <Card
                    key={index}
                    poster={value.poster}
                    category={value.category}
                    createdBy={value.createdBy}
                    title={value.title}
                    description={value.description}
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

export default Portfolio;
