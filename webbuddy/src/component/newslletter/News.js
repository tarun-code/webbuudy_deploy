import "./News.css";

import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createNews } from "../Redux/actions/news";

const News = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const contactFormHandler = (e) => {
    e.preventDefault();
    dispatch(createNews(email));
  };

  const { message, error, loading } = useSelector((state) => state.news);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });

      setEmail("");
    }
  }, [error, message, dispatch]);

  return (
    <>
      <section className="Contact" id="contact">
        <div className="container top">
          <div className="heading text-center">
            <h4>NEWS LETTER</h4>
            <h1>Subscribe To Me</h1>
          </div>

          <div className="content d_flex">
            <div className="right box_shodow">
              <form onSubmit={contactFormHandler}>
                <div className="input row">
                  <span>EMAIL </span>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button className="btn_shadow" type="submit" disabled={loading}>
                  Subscribe{" "}
                  {loading ? (
                    <i class="fa fa-refresh fa-spin"></i>
                  ) : (
                    <i className="fa fa-long-arrow-right"></i>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default News;
