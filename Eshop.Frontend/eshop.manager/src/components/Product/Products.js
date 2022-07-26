import React, { useEffect, useState } from "react";

import ProductService from "../../repository/ProductService";
import AddProduct from "./AddProduct";

import ProductCard from "./ProductCard";

const Products = () => {
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    fetchEntities();
  }, []);

  const fetchEntities = () => {
    ProductService.fetchAll()
      .then((response) => {
        setEntities(response.data);
      })
      .catch((error) => console.log(error));
  };

  const renderEntities = () => {
    return entities.map((product, i) => (
      <div className="col-md-3" key={i}>
        <ProductCard product={product} />
      </div>
    ));
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Product
          </button>

          <div
            className="modal modal-lg fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <AddProduct entities={entities} setEntities={setEntities} />
          </div>
        </div>
        <div className="row">{renderEntities()}</div>
      </div>
    </>
  );
};

export default Products;
