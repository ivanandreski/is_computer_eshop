import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import ShoppingCartApiService from "../../api/ShoppingCartApiService";

const ConfirmOrder = ({ setConfirm }) => {
  const axiosPrivate = useAxiosPrivate();
  const cartApi = new ShoppingCartApiService(axiosPrivate);

  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await cartApi.getUserCart();
        setCart(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderProducts = () => {
    return cart?.products?.map((product, key) => (
      <p key={key} className="text-light">
        <strong>
          {`${product?.product?.name}: ${product?.product?.price?.amount} den`}
        </strong>
      </p>
    ));
  };

  return (
    <div className="container mt-2">
      <div className="card mt-2  bg-secondary border p-4">
        <h3 className="text-light">Confirm order</h3>
        <hr className="text-light" />
        <h5 className="text-light">Products:</h5>
        {renderProducts()}
        <hr className="text-light" />
        <p className="text-light">
          <strong>Total price: {cart?.totalPrice?.amount} den</strong>
        </p>
        <hr />
        <Link to="/checkout" className="btn btn-primary mb-2">Purchase</Link>
        <button className="btn btn-danger" onClick={() => setConfirm(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
