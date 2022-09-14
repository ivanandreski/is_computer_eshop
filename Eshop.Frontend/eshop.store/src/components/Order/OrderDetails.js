import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import OrderApiService from "../../api/OrderApiService";

const OrderDetails = () => {
  const { id } = useParams();
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

  return <div>OrderDetails</div>;
};

export default OrderDetails;
