import React, { useEffect, useState } from "react";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import OrderApiService from "../../api/OrderApiService";

const Orders = () => {
  const axiosPrivate = useAxiosPrivate();
  const orderApi = new OrderApiService(axiosPrivate);

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

  const renderOrders = () => {
    return orders?.map((order, key) => (
      <tr key={key}>
        <th>{key + 1}</th>
        <td>{order.TimeOfPurchase}</td>
        <td>{order.Items}</td>
        <td>{order.money?.amount || 0}</td>
      </tr>
    ));
  };

  return (
    <div className="card p-4">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Time of purchase</th>
            <th>Number of products</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>{renderOrders()}</tbody>
      </table>
    </div>
  );
};

export default Orders;
