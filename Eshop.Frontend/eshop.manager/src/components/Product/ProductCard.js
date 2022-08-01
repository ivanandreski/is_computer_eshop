import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, handleDelete }) => {
  return (
    <>
      <div className="card mt-3" style={{ width: "18rem" }}>
        <img
          src={`data:image/jpeg;base64,${product.images[0]?.image}`}
          className="card-img-top"
          style={{ width: "18rem" }}
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
        </div>
        <div className="card-body d-flex justify-content-end">
          <Link to={`/product/${product.hashId}`} className="btn btn-secondary">
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
    </>
  );
};

export default ProductCard;
