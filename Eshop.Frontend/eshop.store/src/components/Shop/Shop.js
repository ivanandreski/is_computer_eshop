import React from "react";
import ShopContainer from "./ShopContainer.js/ShopContainer";
import Sidebar from "./Sidebar/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Routes } from "react-router-dom";
import "./Shop.css";
import ProductContainer from "./ProductContainer/ProductContainer";
import { Route } from "react-router-dom";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("mxyMadY4vBw");
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState();
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [page, setPage] = useState(1);
  const [searchParam, setSearchParam] = useState("");
  const [currentProduct, setCurrentProduct] = useState(null);

  const fetchCategories = async () => {
    const categories = await axios
      .get(`https://localhost:7158/api/Category`)
      .then((resp) => {
        return resp.data;
      });
    setCategories(categories);
  };

  const fetchProducts = async (
    currentCategory,
    pageSize,
    page,
    searchParam
  ) => {
    let url = `https://localhost:7158/api/Product?categoryHash=${currentCategory}&pageSize=${pageSize}&currentPage=${page}&searchParams=${searchParam}`;
    const resp = await axios.get(url).then((resp) => {
      return resp.data;
    });
    setProducts(resp.items);
    setPageCount(resp.totalPages);
  };
  const fetchProduct = () => {};
  const handleQueryChange = (e) => {
    setSearchParam(e.target.value);
    console.log(e.target.value);
  };

  const handlePerPageChange = (e) => {
    const p = e.target.value;
    setItemsPerPage(p);
    setPage(1);
  };

  const handlePageClick = (e) => {
    const p = e.selected + 1;
    setPage(p);
    console.log(page);
  };

  const handleCategoryChange = (e) => {
    setCurrentCategory(e.target.id);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts(currentCategory, itemsPerPage, page, searchParam);
  }, [currentCategory, itemsPerPage, page, searchParam]);
  return (
    <div className="shop-container">
      <Sidebar
        categories={categories}
        handleCategoryChange={handleCategoryChange}
      ></Sidebar>
            <ShopContainer
              products={products}
              itemsPerPage={itemsPerPage}
              page={page}
              pageCount={pageCount}
              handlePerPageChange={handlePerPageChange}
              handlePageClick={handlePageClick}
              handleQueryChange={handleQueryChange}/>
    </div>
  );
};

export default Shop;
