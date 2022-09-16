import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { PDFExport } from "@progress/kendo-react-pdf";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import OrderApiService from "../../api/OrderApiService";

import pdf from "../../resources/images/pdf.png";

const OrderDetails = () => {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const orderApi = new OrderApiService(axiosPrivate);

  const pdfExportComponent = useRef();

  const [order, setOrder] = useState({});

  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await orderApi.getOrder(id);
        setOrder(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExportPdf = (e) => {
    pdfExportComponent.current.save();
  };

  const renderProducts = () => {
    return order?.products?.map((product, key) => (
      <div key={key} className="col-md-12">
        <div className="row">
          <div className="col-md-1 d-flex align-items-center">
            <strong className="fs-4">{key + 1}.</strong>
          </div>
          <div className="col-md-2">
            <img
              className="pcbuild-product-image"
              src={`data:image/jpeg;base64,${
                product?.product?.images.length > 0 &&
                product?.product?.images[0]?.image
              }`}
              alt=""
            />
          </div>
          <div className="col-md-5">
            <p>{product?.product?.name}</p>
          </div>
          <div className="col-md-2">
            <p>{product?.product?.price?.amount}.00 den</p>
          </div>
          <div className="col-md-2">
            <p>x{product?.quantity}</p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <PDFExport ref={pdfExportComponent} paperSize={"A4"} fileName={`order-${id}.pdf`}>
        <div className="m-3">
          <div className="card bg-light border p-4">
            <h3>
              Order id: <span className="text-primary">{id}</span>
            </h3>
            <hr />
            <h3>Products:</h3>
            <div className="row">{renderProducts()}</div>
            <hr />
            <div className="row">
              <div className="col-md-6 d-flex align-items-center">
                <h5>Total price: {order?.totalPrice?.amount}.00 den</h5>
              </div>
            </div>
          </div>
        </div>
      </PDFExport>
      <div className="m-3">
        <div className="card bg-light border p-4">
          <div className="row">
            <div className="col-md-10 d-flex align-items-center">
              <h1>Export:</h1>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-danger w-100"
                value="pdf"
                onClick={handleExportPdf}
              >
                <img src={pdf} alt="" width="30%" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
