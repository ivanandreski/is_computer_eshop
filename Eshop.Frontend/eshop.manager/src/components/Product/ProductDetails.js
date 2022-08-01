import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductService from "../../repository/ProductService";
import ProductEdit from "./ProductEdit";
import ProductAvailability from "./ProductAvailability";
import ProductImageEdit from "./ProductImageEdit";

const ProductDetails = () => {
  const { hashId } = useParams();
  const [product, setProduct] = useState(null);
  const jsonProduct = JSON.stringify(product);

  useEffect(() => {
    const fetch = () => {
      ProductService.fetch(hashId)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => console.log(error));
    };
    fetch();
  }, [hashId, jsonProduct]);

  return product !== null ? (
    <>
      <div className="container">
        <h1 className="bg-light">
          <span style={{ marginLeft: "10px" }}>{product.name}</span>
        </h1>
        <div className="row mt-2">
          <div className="col-md-12">
            <ProductImageEdit product={product} setProduct={setProduct} />
          </div>
        </div>
        <hr />
        <div className="row mt-2">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12">
                <ProductEdit product={product} setProduct={setProduct} />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className="col">
                <ProductAvailability product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default ProductDetails;
