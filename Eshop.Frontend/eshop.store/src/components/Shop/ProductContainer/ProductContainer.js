import React, { useState, useEffect } from "react";
import tick from "../../../resources/images/green-tick.png";
import cross from "../../../resources/images/red-cross.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProductContainer.css";
import cart from "../../../resources/images/shopping-cart.png";
import hammer from "../../../resources/images/hammer.png";
const ProductContainer = () => {
  const [product, setProduct] = useState(null);
  const { hashId } = useParams();

  const fetchProduct = async () => {
    console.log("called");
    const product = await axios
      .get(`https://localhost:7158/api/Product/${hashId}`)
      .then((resp) => resp.data);
    console.log(product);
    setProduct(product);
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  console.log(product);
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
              {!product?.discontinued ? (
                <img className="sign" src={tick} alt=""></img>
              ) : (
                <img className="sign" src={cross} alt=""></img>
              )}
            </div>
            <div className="add-to-basket">
              Add to Basket <img src={cart} alt=""></img>
            </div>
            <div className="add-to-build">
              Add to Build <img src={hammer} alt=""></img>
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
