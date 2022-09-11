import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import CategoryApiService from "../../api/CategoryApiService";
import ProductApiService from "../../api/ProductApService";

import ShopContainer from "./ShopContainer.js/ShopContainer";
import Sidebar from "./Sidebar/Sidebar";
import ProductContainer from "./ProductContainer/ProductContainer";

import "./Shop.css";

const Shop = () => {
  const axiosPrivate = useAxiosPrivate();
  const categoryApi = new CategoryApiService(axiosPrivate);
  const productApi = new ProductApiService(axiosPrivate);

  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState();
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [page, setPage] = useState(1);
  const [searchParam, setSearchParam] = useState("");
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getCategories();
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchProducts = async (
      currentCategory,
      pageSize,
      page,
      searchParam
    ) => {
      try {
        const response = await productApi.getProducts({
          categoryHash: currentCategory,
          pageSize,
          currentPage: page,
          searchParams: searchParam,
        });
        setProducts(response.data.items);
        setPageCount(response.data.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
    fetchProducts(currentCategory, itemsPerPage, page, searchParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory, itemsPerPage, page, searchParam]);

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
        handleQueryChange={handleQueryChange}
      />
    </div>
  );
};

export default Shop;
