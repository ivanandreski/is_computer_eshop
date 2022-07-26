import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductService from "../../repository/ProductService";
import ProductEdit from "./ProductEdit";
import ProductInStore from "./ProductInStore";

const ProductDetails = () => {
  const { hashId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetch = () => {
      ProductService.fetch(hashId)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => console.log(error));
    };
    fetch();
  }, [hashId]);

  return product !== null ? (
    <>
      <div className="container w-50">
        <h1 className="bg-light">
          <span style={{ marginLeft: "10px" }}>{product.name}</span>
        </h1>
        <div className="row mt-2">
          <div className="col-md-9">
            <ProductEdit product={product} setProduct={setProduct} />
          </div>
          <div className="col-md-3">
            <div className="row">
              <div className="col">
                <img
                  src={`data:image/jpeg;base64,${product.image}`}
                  className=""
                  width="100%"
                  alt="..."
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <ProductInStore product={product} />
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
