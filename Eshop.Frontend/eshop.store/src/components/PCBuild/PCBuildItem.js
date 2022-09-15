import React, { useState, useEffect } from "react";
import Select from "react-select";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import ProductApiService from "../../api/ProductApService";
import PCBuildApiService from "../../api/PCBuildApiService";
import QuantitySelector from "./QuantitySelector";

const PCBuildItem = ({ item, type, pcBuild, setRender }) => {
  const axiosPrivate = useAxiosPrivate();
  const productApi = new ProductApiService(axiosPrivate);
  const pcBuildApi = new PCBuildApiService(axiosPrivate);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await productApi.getItemsForType(type);
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getClass = () => {
    if (type === "Motherboards") {
      if (
        pcBuild.motherboardProccesorCompatibility === -1 ||
        pcBuild.motherboardRamCompatibility === -1
      ) {
        return "bg-danger";
      }
      if (
        pcBuild.motherboardProccesorCompatibility === 1 ||
        pcBuild.motherboardRamCompatibility === 1
      ) {
        return "bg-success";
      }
    } else if (type === "Processors") {
      if (pcBuild.motherboardProccesorCompatibility === -1) {
        return "bg-danger";
      }
      if (pcBuild.motherboardProccesorCompatibility === 1) {
        return "bg-success";
      }
    } else if (type === "RAM") {
      if (pcBuild.motherboardRamCompatibility === -1) {
        return "bg-danger";
      }
      if (pcBuild.motherboardRamCompatibility === 1) {
        return "bg-success";
      }
    } else if (item?.key) {
      return "bg-success";
    }

    return "";
  };

  const handleChange = async (e) => {
    try {
      await pcBuildApi.updateProduct(type, e.value, 1);
      setRender((render) => render + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const getOptions = () => {
    return items?.map((item) => {
      return { value: item?.hashId, label: item?.name };
    });
  };

  const renderSelect = () => {
    if (loading) return <p className="text-light">Loading...</p>;

    return (
      <Select
        className="w-100"
        onChange={handleChange}
        options={getOptions()}
      />
    );
  };

  return (
    <tr className={getClass()}>
      <th className="pc-build-text" scope="row">
        {type}:
      </th>
      <td className="pcbuild-image-col">
        <img
          className="pcbuild-product-image"
          src={`data:image/jpeg;base64,${
            item?.product?.images.length > 0 && item?.product?.images[0]?.image
          }`}
          alt=""
        ></img>
      </td>
      <td className="pc-build-text">{item?.product?.name || "/"}</td>
      <td className="pc-build-text">{`${item?.price || 0}.00 den`}</td>
      <td>
        <QuantitySelector setRender={setRender} item={item} />
      </td>
      <td>{renderSelect()}</td>
    </tr>
  );
};

export default PCBuildItem;
