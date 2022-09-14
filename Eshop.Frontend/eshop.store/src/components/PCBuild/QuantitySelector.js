import React from "react";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import PCBuildApiService from "../../api/PCBuildApiService";

const QuantitySelector = ({ item, setRender }) => {
  const axiosPrivate = useAxiosPrivate();
  const pcBuildApi = new PCBuildApiService(axiosPrivate);

  const handleUpClick = async () => {
    try {
      await pcBuildApi.updateProduct(
        item?.key,
        item?.product?.hashId,
        item?.count + 1
      );
      setRender((render) => render + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownClick = async () => {
    try {
      await pcBuildApi.updateProduct(
        item?.key,
        item?.product?.hashId,
        item?.count - 1
      );
      setRender((render) => render + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return item?.key === "RAM" ||
    item?.key === "Hard Drives" ||
    item?.key === "Solid State Drives" ? (
    <div className="row">
      <div className="col-md-12">
        <button className="btn btn-secondary w-100" onClick={handleUpClick}>
          ↑
        </button>
      </div>
      <div className="col-md-12">
        <button className="btn bg-dark text-light w-100 mt-1 mb-1" disabled>
          <strong>{item?.count || 0}</strong>
        </button>
      </div>
      <div className="col-md-12">
        <button className="btn btn-secondary w-100" onClick={handleDownClick}>
          ↓
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default QuantitySelector;
