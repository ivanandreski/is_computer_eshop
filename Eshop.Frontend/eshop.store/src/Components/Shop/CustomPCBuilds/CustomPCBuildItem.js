import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import Carousel from "react-bootstrap/Carousel";

import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import PCBuildApiService from "../../../api/PCBuildApiService";

const CustomPCBuildItem = ({
  ids,
  title,
  description,
  specs,
  images,
  price,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const pcBuildApi = new PCBuildApiService(axiosPrivate);
  const navigate = useNavigate();

  const [showDetails, setShowDetails] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const renderImages = () => {
    return images.map((image, key) => (
      <Carousel.Item key={key}>
        <img className="d-block w-100" src={image} alt="First slide" />
      </Carousel.Item>
    ));
  };

  const handleOrderClick = async () => {
    let type = "";
    if (title.includes("Entry")) {
      type = "entry";
    } else if (title.includes("Mid")) {
      type = "mid";
    } else if (title.includes("High")) {
      type = "high";
    } else return;

    try {
      await pcBuildApi.orderPreBuildPc(type);
      navigate("/cart");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card custom-pc-item p-4">
      <div className="row">
        <div className="col-md-12">
          <h2 className="text-center">{title}</h2>
          <h4 className="text-center">{price}</h4>
          <hr />
          <h5
            onClick={() => setShowDetails(!showDetails)}
            className="expendable"
          >
            Product description
          </h5>
          <Collapse in={showDetails}>
            <div id="example-collapse-text">{description}</div>
          </Collapse>
          <hr />
          <h5 onClick={() => setShowAbout(!showAbout)} className="expendable">
            About the model
          </h5>
          <Collapse in={showAbout}>
            <div id="example-collapse-text">
              <pre>{specs}</pre>
            </div>
          </Collapse>
        </div>
        <div className="col-md-12">
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {renderImages()}
          </Carousel>
        </div>
        <div className="col-md-12">
          <button
            className="btn btn-secondary w-100"
            onClick={handleOrderClick}
          >
            Order now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPCBuildItem;
