import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductApiService from "../../api/ProductApService";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import InputText from "../Core/InputText";
import DescriptionEdit from "./DescriptionEdit";
import PriceEdit from "./PriceEdit";

const ProductEdit = ({ product, setProduct }) => {
  let navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const productApi = new ProductApiService(axiosPrivate);

  const [edit, setEdit] = useState(false);

  const clearValues = () => {
    return {
      name: product.name,
      manufacturer: product.manufacturer,
      description: product.description,
      basePrice: product.price.amount,
      categoryHashId: product.category.hashId,
      discontinued: product.discontinued,
    };
  };

  const [value, setValue] = useState(clearValues());

  const handleDelete = async () => {
    try {
      await productApi.deleteProduct(product.hashId);
      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setValue(clearValues());
    setEdit(false);
  };

  const handleSave = async () => {
    try {
      const response = await productApi.editProduct(product.hashId, value);
      setProduct(response.data);
      setValue(clearValues());
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return edit ? (
    <>
      <InputText object={value} setObject={setValue} title={"manufacturer"} />
      <DescriptionEdit object={value} setObject={setValue} />
      <PriceEdit object={value} setObject={setValue} />
      <div className="row">
        <div className="col-md-6">
          <button
            className="btn btn-primary w-100"
            onClick={() => handleSave()}
          >
            Save
          </button>
        </div>
        <div className="col-md-6">
          <button
            className="btn btn-danger w-100"
            onClick={() => handleCancel()}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  ) : (
    <>
      <p>{`Manufacturer: ${product.manufacturer}`}</p>
      <p>{"Description:"}</p>
      <pre>{product.description}</pre>
      <p>{`Price: ${product.price?.amount}`}</p>
      <div className="row">
        <div className="col-md-6">
          <button
            className="btn btn-primary w-100"
            onClick={() => setEdit(true)}
          >
            Edit
          </button>
        </div>
        <div className="col-md-6">
          <button
            className="btn btn-danger w-100"
            onClick={() => handleDelete()}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductEdit;
