import React, { useState, useEffect } from "react";

import CategoryService from "../repository/CategoryService";

const ApiTest = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    CategoryService.fetchAll()
      .then((result) => {
        setElements(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <ul>
        {elements.map((e, i) => (
          <li key={i}>{`hashId: ${e.hashId}, name: ${e.name}`}</li>
        ))}
      </ul>
    </>
  );
};

export default ApiTest;
