import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getAllCategories } from "../../api/categoryApi";

import AddCategory from "./AddCategory";
import CategoryTableRow from "./CategoryTableRow";

const Categories = () => {
  const axiosPrivate = useAxiosPrivate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCategories = async () => {
      try {
        const response = await axiosPrivate.get(getAllCategories(), {
          signal: controller.signal,
        });
        isMounted && setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

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
