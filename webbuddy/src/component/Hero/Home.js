import React from "react";
import "./Home.css";

import skill1 from "../pic/skill1.png";
import skill2 from "../pic/skill2.png";
import skill3 from "../pic/skill3.png";
import skill4 from "../pic/skill4.png";
import { Typewriter } from "react-simple-typewriter";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <section className="hero" id="home">
        <div className="container f_flex top">
          <div className="left top">
            <h3>WELCOME TO MY Portfolio</h3>
            <h1>
              Hi, I’m <span>Tarun Shori</span>
            </h1>
            <h2>
              Working On
              <span>
                <Typewriter
                  words={[
                    " Java Script.",
                    " Mongodb.",
                    " ReactJs.",
                    " NodeJs.",
                    " ExpressJs.",
                    " Html.",
                    " Css.",
                    " Php.",
                    " Linux.",
                    " Cloud.",
                    " HPC.",
                    " Python.",
                    " Devops.",
                    " Nginx.",
                    " Squid.",
                    " Docker.",
                    " Jenkins.",
                    " AWS.",
                    " Cloud Security.",
                    " xCAT.",
                    " Slurm.",
                    " Networking.",
                    " CICD pipeline.",
                    
                    
                  ]}
                  loop
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </h2>

            <p>{user?.about}</p>

            <div className="hero_btn d_flex">
              <div className="col_1">
                <h4>FIND WITH ME</h4>
                <div className="button">
                  <a href="https://en-gb.facebook.com/tarun.shori2">
                    <button className="btn_shadow">
                      <i class="fab fa-facebook-f"></i>
                    </button>
                  </a>
                  <a href="https://instagram.com/webbuddy0_0?igshid=ZDdkNTZiNTM=">
                    <button className="btn_shadow">
                      <i class="fab fa-instagram"></i>
                    </button>
                  </a>
                  <a href="https://www.linkedin.com/in/tarun-shori-ab75a817b">
                    <button className="btn_shadow">
                      <i class="fab fa-linkedin-in"></i>
                    </button>
                  </a>
                </div>
              </div>
              <div className="col_1">
                <h4>BEST SKILL ON</h4>
                <button className="btn_shadow">
                  <img src={skill1} alt="" />
                </button>
                <button className="btn_shadow">
                  <img src={skill2} alt="" />
                </button>
                <button className="btn_shadow">
                  <img src={skill3} alt="" />
                </button>
                <button className="btn_shadow">
                  <img src={skill4} alt="" />
                </button>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="right_img">
              <img src={user?.avatar.url} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
