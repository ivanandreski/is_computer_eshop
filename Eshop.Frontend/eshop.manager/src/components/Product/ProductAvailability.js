import React, { useEffect, useState } from "react";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ProductApiService from "../../api/ProductApService";
import ProductInStore from "./ProductInStore";

const ProductAvailability = ({ product }) => {
  const axiosPrivate = useAxiosPrivate();
  const productApi = new ProductApiService(axiosPrivate);

  const [productsInStores, setProductsInStores] = useState([]);
  const jsonProduct = JSON.stringify(productsInStores);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await productApi.getProductAvailability(
          product.hashId
        );
        setProductsInStores(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.hashId, jsonProduct]);

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
