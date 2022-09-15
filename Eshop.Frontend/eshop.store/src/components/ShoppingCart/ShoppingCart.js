import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import ShoppingCartApiService from "../../api/ShoppingCartApiService";

import ShoppingCartItem from "./ShoppingCartItem";
import ConfirmOrder from "../Order/ConfirmOrder";

import "./style.css";

const ShoppingCart = () => {
  const axiosPrivate = useAxiosPrivate();
  const cartApi = new ShoppingCartApiService(axiosPrivate);

  const [cart, setCart] = useState({});
  const [confirm, setConfirm] = useState(false);
  const [render, setRender] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await cartApi.getUserCart();
        setCart(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  const renderCartProducts = () => {
    return cart?.products?.map((product, key) => (
      <ShoppingCartItem key={key} product={product} setRender={setRender} />
    ));
  };

  const handleClearClick = async () => {
    try {
      await cartApi.clearCart();
      setRender((render) => render + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = () => {
    if (cart?.products?.length < 1) return;

    setConfirm(true);
  };

  return loading ? (
    <div>Loading...</div>
  ) : confirm ? (
    <ConfirmOrder setConfirm={setConfirm} />
  ) : (
    <div className="row ms-3 me-3 mt-3" style={{ color: "white" }}>
      <div className="col-md-10" style={{ backgroundColor: "#1a0000" }}>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div
                className="col-md-5 product-price"
                style={{ fontWeight: "bold", fontSize: "x-large" }}
              >
                Item:
              </div>
              <div
                className="col-md-2 product-price"
                style={{ fontWeight: "bold", fontSize: "x-large" }}
              >
                Quantity
              </div>
              <div
                className="col-md-3 product-price text-center"
                style={{ fontWeight: "bold", fontSize: "x-large" }}
              >
                Sum
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
          <hr />
          {renderCartProducts()}
        </div>
        <div className="row">
          <div className="col-md-12" style={{ backgroundColor: "black" }}>
            <div className="row pt-2 pb-2">
              <div
                className="col-md-9"
                style={{ fontWeight: "bold", fontSize: "x-large" }}
              >
                TOTAL:
              </div>
              <div
                className="col-md-3 d-flex justify-content-end"
                style={{ fontWeight: "bold", fontSize: "x-large" }}
              >
                {cart?.totalPrice?.amount}.00 den
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-3" style={{ backgroundColor: "#303135" }}>
          <div className="col-md-3">
            <button className="btn btn-danger w-100" onClick={handleConfirm}>
              Proceed to checkout
            </button>
          </div>
          <div className="col-md-6">
            <button className="btn btn-secondary" onClick={handleClearClick}>
              Clear cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
