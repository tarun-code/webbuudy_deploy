import React from "react";
import "../Portfolio/Portfolio.css";
import "../Blog/Blog.css";
import Card from "./Card";
// import BlogApi from "./BlogApi";
import { getAllBlog } from "../Redux/actions/blog";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Blog = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBlog());
  }, [dispatch]);

  const { blogs } = useSelector((state) => state.blog);
  return (
    <>
      <section className="Portfolio Blog" id="blog">
        <div className="container top">
          <div className="heading text-center">
            <h4>VISIT MY BLOG AND KEEP YOUR FEEDBACK</h4>
            <h1>My Blog</h1>
          </div>

          <div className="content grid">
            {blogs &&
              blogs.map((value) => {
                return (
                  <Card
                    key={value._id}
                    poster={value.poster}
                    createdAt={value.createdAt}
                    title={value.title}
                    description={value.description}
                    category={value.category}
                    createdBy={value.createdBy}
                    comments={value.comments}
                    id={value._id}
                  />
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
