import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import OrderApiService from "../../api/OrderApiService";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  const axiosPrivate = useAxiosPrivate();
  const orderApi = new OrderApiService(axiosPrivate);

  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const response = await orderApi.createOrder();
        setOrderId(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    createOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <div>Loading</div>
  ) : (
    <div className="mt-3 d-flex justify-content-center">
      <div className="card bg-light border p-4 w-50">
        <h5>Order with id: {orderId}, successfully created!</h5>
        <Link className="btn btn-success" to={`/orderDetails/${orderId}`}>
          Details
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
