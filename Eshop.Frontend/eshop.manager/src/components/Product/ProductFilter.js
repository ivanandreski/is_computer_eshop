import React, { useEffect, useState } from "react";
import Select from "react-select";

import CategoryApiService from "../../api/CategoryApiService";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ProductFilter = ({ queryString, setQueryString }) => {
  const axiosPrivate = useAxiosPrivate();
  const categoryApi = new CategoryApiService(axiosPrivate);

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await categoryApi.getCategories();
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (option) => {
    setQueryString({
      ...queryString,
      categoryHash: option.value,
    });
  };

  const handleSearch = () => {
    setQueryString({
      ...queryString,
      searchParams: search,
    });
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <Select
          options={categories.map((c) => {
            return { label: c.name, value: c.hashId };
          })}
          onChange={handleCategoryChange}
          className="w-100"
        />
      </div>
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="col-md-2">
        <button
          type="submit"
          className="btn btn-primary w-100"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
