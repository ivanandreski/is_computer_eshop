import React, { useState, useEffect } from "react";
import Select from "react-select";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import ProductApiService from "../../api/ProductApService";
import PCBuildApiService from "../../api/PCBuildApiService";

const PCBuildItem = ({ item, type, pcBuild, setRender }) => {
  const axiosPrivate = useAxiosPrivate();
  const productApi = new ProductApiService(axiosPrivate);
  const pcBuildApi = new PCBuildApiService(axiosPrivate);

  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState({
    value: item?.product?.hashId,
    label: item?.product?.name,
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await productApi.getItemsForType(type);
        setItems(response.data);
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

  return (
    <tr className={getClass()}>
      <th className="pc-build-text" scope="row">
        {type}:
      </th>
      <td className="pc-build-text">{item?.product?.name || "/"}</td>
      <td className="pc-build-text">{`${item?.price || 0}.00 den`}</td>
      <td>
        <Select
          className="w-100"
          selectedOptions={selected}
          onChange={handleChange}
          options={getOptions()}
        />
      </td>
    </tr>
  );
};

export default PCBuildItem;
