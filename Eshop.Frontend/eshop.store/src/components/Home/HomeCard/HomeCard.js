import React from "react";
import { Link } from "react-router-dom";
import "./HomeCard.css";
const HomeCard = ({ image, description, buttonText, destination }) => {
  return (
    <div className="home-card">
      <img className="home-card-img" src={image} alt=""></img>
      <div className="home-card-description text-center">{description}</div>
      <div className="home-card-button text-center">
        <Link to={`/${destination}`}>{buttonText}</Link>
      </div>
    </div>
  );
};

export default HomeCard;
