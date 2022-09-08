import React from "react";
import HomeCard from "./HomeCard/HomeCard";
import forum from "../../resources/images/forum.png";
import pc from "../../resources/images/pc.png";
import hammer from "../../resources/images/hammer.png";
import home from "../../resources/images/home.jpg";
import "./Home.css";
const HomePage = () => {
  return (
    <div>
      <div>
        <img src={home} className="home-img"></img>
        <div className="home-text">
          <div className="home-title">Level UP! your setup</div>
          <div className="home-description">
            Let us be your first choice when it comes to elevating your work,
            gaming or overall computer experience
          </div>
        </div>
      </div>
      <div className="card-container">
        <HomeCard
          image={pc}
          destination={"Shop"}
          description={"Best quality PC parts and complete builds await you "}
          buttonText={"SHOP NOW"}
        />
        <HomeCard
          image={hammer}
          destination={"Builder"}
          description={
            "Not sure if what you want is compatible? Dont worry our PC builder has your back"
          }
          buttonText={"BUILD NOW"}
        />
        <HomeCard
          image={forum}
          destination={"Forum"}
          description={
            "Still have questions? Visit the forum where other users and employees are eager to answer your questions"
          }
          buttonText={"VISIT FORUM"}
        />
      </div>
    </div>
  );
};

export default HomePage;
