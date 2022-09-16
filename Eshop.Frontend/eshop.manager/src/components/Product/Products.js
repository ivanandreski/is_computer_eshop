import React, { useEffect, useState } from "react";

import ProductApiService from "../../api/ProductApService";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Pagination from "../Core/Pagination";

import AddProduct from "./AddProduct";
import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";

const Products = () => {
  const axiosPrivate = useAxiosPrivate();
  const productApi = new ProductApiService(axiosPrivate);

  const [entities, setEntities] = useState([]);
  const [queryString, setQueryString] = useState({
    currentPage: 1,
    pageSize: 12,
    searchParams: "",
    categoryHash: "",
  });
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntities = async () => {
      setLoading(true);
      try {
        const response = await productApi.getProducts(queryString);
        console.log(response.data);
        setEntities(response.data.items);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEntities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

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

  return loading ? (
    <div>Loading...</div>
  ) : (
    <>
      <div className="container">
        <Pagination
          totalPages={totalPages}
          queryString={queryString}
          setQueryString={setQueryString}
        />
        <ProductFilter
          queryString={queryString}
          setQueryString={setQueryString}
        />
        <div className="row">
          <AddProduct entities={entities} setEntities={setEntities} />
        </div>
        <div className="row">{renderEntities()}</div>
      </div>
    </>
  );
};

export default Products;
