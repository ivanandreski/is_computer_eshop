import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import OrderApiService from "../../api/OrderApiService";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  const axiosPrivate = useAxiosPrivate();
  const orderApi = new OrderApiService(axiosPrivate);

  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const createOrder = async () => {
      try {
        const response = await orderApi.createOrder();
        setOrderId(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    createOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="p-4 card w-25 border">
        <h5>Order with id: {orderId}, successfully created!</h5>
        <Link className="btn btn-success" to={`/order/${orderId}`}>
          Details
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
