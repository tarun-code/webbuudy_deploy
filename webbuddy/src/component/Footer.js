import React from "react";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="conatiner text-center top">
          <div className="img">
            {/* <img src={logo1} alt='' /> */}
            <h3>Tarun Shori</h3>
          </div>
          <p>
            © {new Date().getFullYear()}. All Rights Reserved By Tarun shori.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
