import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, handleDelete }) => {
  return (
    <>
      <div className="card mt-3" style={{ height: "40vh" }}>
        <div className="d-flex justify-content-center">
          <img
            src={`data:image/jpeg;base64,${product.image}`}
            className="card-img-top"
            style={{ height: "8rem", width: "12rem" }}
            alt="..."
          />
        </div>
        <div className="card-body">
          <strong className="card-title">{product.name}</strong>
        </div>
        <div className="card-body d-flex justify-content-end">
          <div>
            <Link
              to={`/product/${product.hashId}`}
              className="btn btn-secondary"
            >
              Details
            </Link>
            <button
              className="btn btn-danger"
              style={{ marginLeft: "5px" }}
              onClick={() => handleDelete(product.hashId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
