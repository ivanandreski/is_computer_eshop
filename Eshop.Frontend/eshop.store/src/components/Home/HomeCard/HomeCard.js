import React from "react";
import { Link } from "react-router-dom";
import "./HomeCard.css";
const HomeCard = ({ image, description, buttonText, destination }) => {
  return (
    <div className="home-card">
      <img className="home-card-img" src={image}></img>
      <div className="home-card-description">{description}</div>
      <div className="home-card-button">
        <Link to={`/${destination}`}>{buttonText}</Link>
      </div>
    </div>
  );
};

export default HomeCard;
