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

import { axiosPrivate } from "../../../api/axios";
const ProductContainer = () => {
  const [product, setProduct] = useState(null);
  const { hashId } = useParams();
  const cartApi = new ShoppingCartApiService(axiosPrivate);
  const productApi = new productService(axiosPrivate);
  const builderApi = new PCBuildApiService(axiosPrivate);

  const fetchProduct = async () => {
    const resp = await productApi.getProduct(hashId);
    setProduct(resp.data);
  };
  const handleAddToCart = async () => {
    await cartApi.addProductToCart(hashId);
  };
  const handleAddToBuild = async () => {
    await builderApi.updateProduct(product.type, hashId, 1);
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div className="product-container">
      <div className="product-title">{product?.name}</div>
      <div className="product-main">
        <div className="product-images-container">
          <img
            className="product-description-image"
            src={`data:image/jpeg;base64,${product?.images[0].image}`}
          ></img>
        </div>
        <div className="product-main-right">
          <div className="manufacturer-stock">
            <div>Manufacturer: {product?.manufacturer}</div>
            <div>
              On stock:
              {!product?.discontinued ? (
                <img className="sign" src={tick} alt=""></img>
              ) : (
                <img className="sign" src={cross} alt=""></img>
              )}
            </div>
            <div className="add-to-basket" onClick={handleAddToCart}>
              Add to Basket <img src={cart}></img>
            </div>
            <div className="add-to-build" onClick={handleAddToBuild}>
              Add to Build <img src={hammer}></img>
            </div>
          </div>
        </div>
      </div>
      <div className="product-bottom">
        Product Description:
        <div id="product-description">{product?.description}</div>
      </div>
    </div>
  );
};

export default ProductContainer;
