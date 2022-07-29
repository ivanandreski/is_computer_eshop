import React, { useEffect, useState } from "react";

import ProductService from "../../repository/ProductService";
import ProductInStore from "./ProductInStore";

const ProductAvailability = ({ product }) => {
  const [productsInStores, setProductsInStores] = useState([]);

  useEffect(() => {
    const fetch = () => {
      return ProductService.fetchAvailability(product.hashId)
        .then((resp) => {
          setProductsInStores(resp.data);
        })
        .catch((error) => console.log(error));
    };
    fetch();
  }, [product.hashId, productsInStores]);

  const renderStores = () => {
    return productsInStores.map((p, i) => (
      <div key={i} className="row mt-2">
        <hr />
        <div className="col">
          <ProductInStore productInStore={p} save={setProductsInStores} />
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="card p-2">
        <h5>Availability</h5>
        {renderStores()}
      </div>
    </>
  );
};

export default ProductAvailability;
