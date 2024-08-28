import contact1 from "./contact1.png";
import "./Contact.css";
import { createContact } from "../Redux/actions/contact";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// import { useAlert } from "react-alert";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const contactFormHandler = (e) => {
    e.preventDefault();
    dispatch(createContact(name, email, number, subject, query));
  };

  const { message, error, loading } = useSelector((state) => state.contact);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });

      setName("");
      setEmail("");
      setNumber("");
      setSubject("");
      setQuery("");
    }
  }, [error, message, dispatch]);

  return (
    <>
      <section className="Contact" id="contact">
        <div className="container top">
          <div className="heading text-center">
            <h4>CONTACT</h4>
            <h1>Contact With Me</h1>
          </div>

          <div className="content d_flex">
            <div className="left">
              <div className="box box_shodow">
                <div className="img">
                  <img src={contact1} alt="" />
                </div>
                <div className="details">
                  <h1>{user?.name}</h1>
                  <p>Web Developer</p>
                  <p>{user?.about}</p>
                  <br />
                  <p>Phone : +918223820538</p>
                  <p>Email : {user?.email}</p> <br />
                  <span>FIND WITH ME</span>
                  <div className="button f_flex">
                    <a href="https://en-gb.facebook.com/tarun.shori2">
                      {" "}
                      <button className="btn_shadow">
                        <i className="fab fa-facebook-f"></i>
                      </button>
                    </a>
                    <a href="https://instagram.com/webbuddy0_0?igshid=ZDdkNTZiNTM=">
                      <button className="btn_shadow">
                        <i className="fab fa-instagram"></i>
                      </button>
                    </a>
                    <a href="https://www.linkedin.com/in/tarun-shori-ab75a817b">
                      <button className="btn_shadow">
                        <i className="fab fa-linkedin-in"></i>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="right box_shodow">
              <form onSubmit={contactFormHandler}>
                <div className="f_flex">
                  <div className="input row">
                    <span>YOUR NAME</span>
                    <input
                      type="text"
                      name="fullname"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="input row">
                    <span>PHONE NUMBER </span>
                    <input
                      type="number"
                      name="phone"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input">
                  <span>EMAIL </span>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input">
                  <span>SUBJECT </span>
                  <input
                    type="text"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div className="input">
                  <span>YOUR MESSAGE </span>
                  <textarea
                    cols="30"
                    rows="10"
                    name="message"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  ></textarea>
                </div>
                <button className="btn_shadow" type="submit" disabled={loading}>
                  SEND MESSAGE
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

export default Contact;
