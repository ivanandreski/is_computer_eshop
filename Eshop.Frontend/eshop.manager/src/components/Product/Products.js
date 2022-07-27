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

  const handleDelete = (hashId) => {
    ProductService.delete(hashId)
      .then((resp) => {
        setEntities(entities.filter((e) => e.hashId !== hashId));
      })
      .catch((error) => console.log(error));
  };

  const renderEntities = () => {
    return entities.map((product, i) => (
      <div className="col-md-3" key={i}>
        <ProductCard product={product} handleDelete={handleDelete} />
      </div>
    ));
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <AddProduct entities={entities} setEntities={setEntities} />
        </div>
        <div className="row">{renderEntities()}</div>
      </div>
    </>
  );
};

export default Products;
