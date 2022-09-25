import React, { useState, useEffect } from "react";
import tick from "../../../resources/images/green-tick.png";
import cross from "../../../resources/images/red-cross.png";
// import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProductContainer.css";
import cart from "../../../resources/images/shopping-cart.png";
import hammer from "../../../resources/images/hammer.png";
import productService from "../../../api/ProductApService";
import ShoppingCartApiService from "../../../api/ShoppingCartApiService";
import PCBuildApiService from "../../../api/PCBuildApiService";

import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
const ProductContainer = () => {
  const [product, setProduct] = useState(null);
  const [availability, setAvailability] = useState([]);
  const { hashId } = useParams();

  const axiosPrivate = useAxiosPrivate();
  const cartApi = new ShoppingCartApiService(axiosPrivate);
  const productApi = new productService(axiosPrivate);
  const builderApi = new PCBuildApiService(axiosPrivate);

  const handleAddToCart = async () => {
    try {
      await cartApi.addProductToCart(hashId);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddToBuild = async () => {
    try {
      await builderApi.updateProduct(product?.category?.name, hashId, 1);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchProduct = () => {
    try {
      productApi.getProduct(hashId).then((resp) => setProduct(resp.data));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAvailability = () => {
    try {
      productApi
        .getProductAvailability(hashId)
        .then((resp) => setAvailability(resp.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(availability);
  console.log(availability.some((a) => a.quantity > 0));
  return (
    <div className="product-container">
      <div className="product-title">{product?.name}</div>
      <div className="product-main">
        <div className="product-images-container">
          <img
            className="product-description-image"
            src={`data:image/jpeg;base64,${product?.images[0].image}`}
            alt=""
          ></img>
        </div>
        <div className="product-main-right">
          <div className="manufacturer-stock">
            <div>Manufacturer: {product?.manufacturer}</div>
            <div>
              On stock:
              {availability?.some((a) => {
                return a.quantity > 0;
              }) ? (
                <img className="sign" src={tick} alt=""></img>
              ) : (
                <img className="sign" src={cross} alt=""></img>
              )}
            </div>
            <div className="add-to-basket" onClick={handleAddToCart}>
              Add to Basket <img src={cart} alt=""></img>
            </div>
            <div className="add-to-build" onClick={handleAddToBuild}>
              Add to Build <img src={hammer} alt=""></img>
            </div>
          </div>
        </div>
      </div>
      <div className="product-bottom">
        <div className="product-bottom-left">
          <span className="description-title">Product Description:</span>
          <pre id="product-description">{product?.description}</pre>
        </div>
        <div className="product-bottom-right">
          <span className="description-title">Availability per store:</span>
          {availability?.map((a) => {
            return (
              <div className="availability">
                {a.store.name}: <img src={a.available ? tick : cross}></img>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductContainer;
