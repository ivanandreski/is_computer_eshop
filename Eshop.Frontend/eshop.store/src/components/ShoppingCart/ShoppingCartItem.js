import React from "react";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import ShoppingCartApiService from "../../api/ShoppingCartApiService";

import QuantitySelector from "./QuantitySelector";

const ShoppingCartItem = ({ product, setRender }) => {
  const axiosPrivate = useAxiosPrivate();
  const cartApi = new ShoppingCartApiService(axiosPrivate);

  const handleDelete = async () => {
    try {
      await cartApi.removeProduct(product.hashId);
      setRender((render) => render + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-2">
          <img
            src={`data:image/jpeg;base64,${product?.product?.images[0]?.image}`}
            width="90%"
            style={{ padding: "10px" }}
            alt=""
          />
        </div>
        <div className="col-md-3">{product?.product?.name}</div>
        <div className="col-md-2">
          <QuantitySelector
            quantity={product?.quantity}
            setRender={setRender}
            productHashId={product?.hashId}
          />
        </div>
        <div className="col-md-3 product-price-cart text-center">
          {product?.product?.price?.amount * product?.quantity}.
          <span className="double-o">00</span> den
        </div>
        <div className="col-md-2 d-flex align-items-center">
          <button className="btn btn-danger w-100" onClick={handleDelete}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartItem;
