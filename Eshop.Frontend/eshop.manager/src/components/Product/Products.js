import React, { useEffect, useState } from "react";

import ProductApiService from "../../api/ProductApService";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import AddProduct from "./AddProduct";
import ProductCard from "./ProductCard";

const Products = () => {
  const axiosPrivate = useAxiosPrivate();
  const productApi = new ProductApiService(axiosPrivate);

  const [entities, setEntities] = useState([]);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await productApi.getProducts();
        setEntities(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEntities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (hashId) => {
    try {
      await productApi.deleteProduct(hashId);
      setEntities(entities.filter((e) => e.hashId !== hashId));
    } catch (error) {
      console.log(error);
    }
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
