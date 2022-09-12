import React from "react";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import ShoppingCartApiService from "../../api/ShoppingCartApiService";

const QuantitySelector = ({ quantity, productHashId, setRender }) => {
  const axiosPrivate = useAxiosPrivate();
  const cartApi = new ShoppingCartApiService(axiosPrivate);

  const handleUpClick = async () => {
    try {
      await cartApi.changeProductQuantity(productHashId, quantity + 1);
      setRender((render) => render + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownClick = async () => {
    try {
      await cartApi.changeProductQuantity(productHashId, quantity - 1);
      setRender((render) => render + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="row">
          <div className="col-md-12 quantity-selector-arrow">{quantity}</div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="row">
          <div
            className="col-md-12 quantity-selector-arrow"
            onClick={handleUpClick}
          >
            ↑
          </div>
          <div
            className="col-md-12 quantity-selector-arrow"
            onClick={handleDownClick}
          >
            ↓
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantitySelector;
