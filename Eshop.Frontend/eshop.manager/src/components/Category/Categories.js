import React, { useState, useEffect } from "react";

import CategoryService from "../../repository/CategoryService";
import AddCategory from "./AddCategory";
import CategoryTableRow from "./CategoryTableRow";

const Categories = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    CategoryService.fetchAll()
      .then((result) => {
        setElements(result.data);
      })
      .catch((error) => console.log(error));
    console.log("in fetch");
  };

  const saveValue = (id, value) => {
    CategoryService.edit(id, value)
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => console.log(error));

    // todo: swal alert
  };

  const handleDelete = (e) => {
    CategoryService.delete(e.target.value)
      .then((result) => {
        setElements(elements.filter((e) => e.hashId !== result.data.hashId));
      })
      .catch((error) => console.log(error));

    // todo: swal alert
  };

  const renderRows = () => {
    return elements?.map((e, i) => (
      <CategoryTableRow
        key={i}
        element={e}
        saveValue={saveValue}
        handleDelete={handleDelete}
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
        <AddCategory elements={elements} setElements={setElements} />
      </div>
    </>
  );
};

export default Categories;
