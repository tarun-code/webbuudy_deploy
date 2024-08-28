import React from "react";

const Card = (props) => {
  return (
    <>
      <div className="box btn_shadow ">
        <img src={props.image.url} alt="" />
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <a href="/">
          <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </>
  );
};

export default Card;
