import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import OrderApiService from "../../api/OrderApiService";

const Orders = () => {
  const axiosPrivate = useAxiosPrivate();
  const orderApi = new OrderApiService(axiosPrivate);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderApi.getOrdersForUser();
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (e) => {
    navigate("/orderDetails/" + e.currentTarget.id);
  };

  const renderOrders = () => {
    return orders?.map((order, key) => (
      <tr
        key={key}
        onClick={handleClick}
        className="order-item"
        id={order.hashId}
      >
        <th>{key + 1}</th>
        <td>{order.timeOfPurchase}</td>
        <td>{order.status}</td>
        <td>{order.totalPrice?.amount || 0}.00 den</td>
      </tr>
    ));
  };

  return (
    <div className="card p-4">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Time of purchase</th>
            <th>Status</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>{renderOrders()}</tbody>
      </table>
    </div>
  );
};

export default Orders;
