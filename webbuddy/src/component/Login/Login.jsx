import "./Login.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/actions/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginFormHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const backHandler = () => {
    navigate("/");
  };

  const { message, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }

    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [alert, error, message, dispatch]);

  return (
    <>
      <section className="Contact" id="contact">
        <div className="container top">
          <div className="heading text-center">
            <h4>Log In</h4>
            <h1>Only For Admin </h1>
          </div>

          <div className="right box_shodow">
            <form onSubmit={loginFormHandler}>
              <div className="f_flex"></div>
              <div className="input">
                <span>EMAIL </span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  size={20}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input">
                <span>PASSWORD </span>
                <input
                  type="password"
                  name="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="btn_shadow" type="submit">
                Log In <i className="fa fa-long-arrow-right"></i>
              </button>
              <button className="btn_shadow" onClick={backHandler}>
                Back To The Portfolio <i className="fa fa-long-arrow-left"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
