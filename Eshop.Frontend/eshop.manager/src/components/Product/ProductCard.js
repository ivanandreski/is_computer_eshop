import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={`data:image/jpeg;base64,${product.image}`}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
        </div>
        <div className="card-body">
          <Link to={`/product/${product.hashId}`} className="btn btn-secondary">
            Details
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
