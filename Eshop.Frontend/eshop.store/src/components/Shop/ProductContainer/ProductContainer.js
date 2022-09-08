import React, { useState, useEffect } from "react";
import tick from "../../../resources/images/green-tick.png";
import cross from "../../../resources/images/red-cross.png";
import axios from "axios";
import { useParams } from "react-router-dom";
const ProductContainer = () => {
  const [product, setProduct] = useState(null);
  const { hashId } = useParams();

  const fecthProduct = async () => {
    console.log(
      await axios
        .get(`https://localhost:7158/api/Product/${hashId}`)
        .then((resp) => resp.data)
    );
  };

  useEffect(() => {
    fecthProduct();
  });

  return (
    <div className="product-container">
      <div className="product-title">{}</div>
      <div className="product-main">
        <div className="product-images-container"></div>
        <div className="product-main-right">
          <div className="manufacturer-stock">
            <div>Manufacturer: {}</div>
            <div>
              On stock:
              {product ? <img src={tick}></img> : <img src={cross}></img>}
            </div>
          </div>
        </div>
      </div>
      <div className="product-bottom"></div>
    </div>
  );
};

export default ProductContainer;
