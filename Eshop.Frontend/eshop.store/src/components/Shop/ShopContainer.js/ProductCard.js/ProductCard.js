import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

import useAxiosPrivate from "../../../../Hooks/useAxiosPrivate";
import ShoppingCartApiService from "../../../../api/ShoppingCartApiService";

import cart from "../../../../resources/images/shopping-cart.png";

const ProductCard = ({ item }) => {
  const axiosPrivate = useAxiosPrivate();
  const cartApi = new ShoppingCartApiService(axiosPrivate);

  const { hashId: key, name, price, image } = item;

  const handleAddToCart = async () => {
    try {
      await cartApi.addProductToCart(key);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={key} className="product-card">
      <div className="card-image-container">
        <img
          className="card-image"
          src={`data:image/jpeg;base64,${image}`}
          alt=""
        ></img>
      </div>
      <div className="card-product-title text-center">
        <span>{name}</span>
      </div>
      <div className="product-button text-center">
        <Link to={`/Shop/${key}`}>Learn More</Link>
      </div>
      <div className="product-price text-center">
        Price: {price.amount}.<span className="double-o">00</span> den
        <span
          className="product-cart-button text-center ms-4 pt-2 pb-2"
          onClick={() => handleAddToCart(key)}
        >
          <img src={cart} alt="" height="25px" width="25px" />
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
