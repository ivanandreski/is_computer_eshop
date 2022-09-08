import React from "react";
import { Link } from "react-router-dom";
import './ProductCard.css'
const ProductCard = ({ item }) => {
  const { hashId: key, name, price, image } = item;
  return (
    <div key={key} className="product-card">
      <div className="card-image-container">
        <img className="card-image" src={`data:image/jpeg;base64,${image}`}></img>
      </div>
      <div className="card-product-title">
        <span>{name}</span>
      </div>
      <div className="product-button">
        <Link to={`/Shop/${key}`}>Learn More</Link>
      </div>
      <div className="product-price">Price: {price.amount}.<span className="double-o">00</span> den</div>
    </div>
  );
};

export default ProductCard;
