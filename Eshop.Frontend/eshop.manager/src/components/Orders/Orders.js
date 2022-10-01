import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import OrderApiService from "../../api/OrderApiService";

const Orders = () => {
  const axiosPrivate = useAxiosPrivate();
  const orderApi = new OrderApiService(axiosPrivate);

  const [orders, setOrders] = useState();
  const [filter, setFilter] = useState({
    searchParams: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderApi.getOrders(filter);
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();

    return () => {
      setLoading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter.searchParams]);

  const handleStatusUpdate = async (hashId) => {
    if (hashId) {
      try {
        const response = await orderApi.updateStatus(hashId);
        const order = orders.find((o) => o.hashId === hashId);
        order.status = response.data;
        if (order.status === "Shipped" || order.status === "Completed") {
          setOrders([...orders.filter((o) => o.hashId !== hashId)]);
        } else setOrders([...orders.filter((o) => o.hashId !== hashId), order]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderOrders = () => {
    return orders?.map((order, key) => (
      <tr key={key} id={order.hashId}>
        <th>{key + 1}</th>
        <td>{order.timeOfPurchase}</td>
        <td>{order.status}</td>
        <td>{order.totalPrice?.amount || 0}.00 den</td>
        <td>{order.username}</td>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => handleStatusUpdate(order.hashId)}
          >
            Update Status
          </button>
        </td>
      </tr>
    ));
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setFilter({
      ...filter,
      searchParams: e.target.search.value,
    });
  };

  return loading ? (
    <div>
      <strong>Loading...</strong>
    </div>
  ) : (
    <div className="card p-4">
      <div className="mt-3">
        <div className="card bg-light border p-4">
          <div className="row">
            <div className="col-md-12">
              <form
                onSubmit={handleSearchChange}
                className="w-100"
                style={{ display: "inline-block" }}
              >
                <div className="row">
                  <div className="col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      name="search"
                    />
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-primary w-100">Search</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <table className="table table-striped table-hover table-bordered mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Time of purchase</th>
            <th>Status</th>
            <th>Total Price</th>
            <th>User</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderOrders()}</tbody>
      </table>
    </div>
  );
};

export default Orders;
