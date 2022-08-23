import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CategoryApiService from "../../api/CategoryApiService";

import AddCategory from "./AddCategory";
import CategoryTableRow from "./CategoryTableRow";

const Categories = () => {
  const axiosPrivate = useAxiosPrivate();
  const categoryApi = new CategoryApiService(axiosPrivate);

  const [categories, setCategories] = useState([]);

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

  const renderRows = () => {
    return categories.map((e, i) => (
      <CategoryTableRow
        key={i}
        element={e}
        categories={categories}
        setCategories={setCategories}
        i={i}
      />
    ));
  };

  return (
    <>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
        <AddCategory categories={categories} setCategories={setCategories} />
      </div>
    </>
  );
};

export default Categories;
