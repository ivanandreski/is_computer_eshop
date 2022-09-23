import React, { useState, useEffect, useRef } from "react";
import { PDFExport } from "@progress/kendo-react-pdf";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AdminApiService from "../../api/AdminApiService";

import pdf from "../../resources/images/pdf.png";

const Orders = () => {
  const axiosPrivate = useAxiosPrivate();
  const adminApi = new AdminApiService(axiosPrivate);

  const pdfExportComponent = useRef();

  const [orders, setOrders] = useState();
  const [filter, setFilter] = useState({
    searchParams: "",
    dateFrom: {},
    dateTo: {},
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await adminApi.getOrders(filter);
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter.dateFrom, filter.dateTo, filter.searchParams]);

  const renderOrders = () => {
    return orders?.map((order, key) => (
      <tr key={key} className="order-item" id={order.hashId}>
        <th>{key + 1}</th>
        <td>{order.timeOfPurchase}</td>
        <td>{order.items}</td>
        <td>{order.totalPrice?.amount || 0}.00 den</td>
        <td>{order.username}</td>
      </tr>
    ));
  };

  const handleExportPdf = (e) => {
    pdfExportComponent.current.save();
  };

  const handleFromChange = (e) => {
    setFilter({
      ...filter,
      dateFrom: e.target.value,
    });
  };

  const handleToChange = (e) => {
    setFilter({
      ...filter,
      dateTo: e.target.value,
    });
  };

  const handleSearchChange = (e) => {
    setFilter({
      ...filter,
      searchParams: e.target.value,
    });
  };

  return (
    <div className="card p-4">
      <div className="mt-3">
        <div className="card bg-light border p-4">
          <div className="row">
            <div className="col-md-3">
              <input
                type="date"
                className="form-control"
                onChange={handleFromChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                onChange={handleSearchChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="date"
                className="form-control"
                onChange={handleToChange}
              />
            </div>
          </div>
        </div>
      </div>
      <PDFExport
        ref={pdfExportComponent}
        paperSize={"A4"}
        fileName={`orders.pdf`}
      >
        <table className="table table-striped table-hover table-bordered mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Time of purchase</th>
              <th>Number of products</th>
              <th>Total Price</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>{renderOrders()}</tbody>
        </table>
      </PDFExport>
      <div className="mt-3">
        <div className="card bg-light border p-4">
          <div className="row">
            <div className="col-md-10 d-flex align-items-center">
              <h3>Export:</h3>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-danger w-100"
                value="pdf"
                onClick={handleExportPdf}
              >
                <img src={pdf} alt="" width="50%" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
