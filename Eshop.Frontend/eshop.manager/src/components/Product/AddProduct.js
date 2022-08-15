import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

import FormTextField from "../Core/FormTextField";
import FormTextAreaField from "../Core/FormTextAreaField";
import FormNumberField from "../Core/FormNumberField";
import FormSelectField from "../Core/FormSelectField";
import CategoryService from "../../repository/CategoryService";
import FormImageField from "../Core/FormImageField";
import ProductService from "../../repository/ProductService";

const AddProduct = ({ entities, setEntities }) => {
  const clearForm = () => {
    return {
      name: "",
      manufacturer: "",
      description: "",
      basePrice: "",
      categoryHashId: "",
      discontinued: false,
      image: [],
    };
  };

  const [product, setProduct] = useState(clearForm());
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    ProductService.add(product)
      .then((resp) => {
        const { data } = resp;
        setEntities([...entities, data]);
        setProduct(clearForm());
        setOpen(!open);
      })
      .catch((error) => console.log(error));
  };

  const handleButtonClick = () => {
    if (open) setProduct(clearForm());
    setOpen(!open);
  };

  const getButtonMessage = () => {
    return open ? "Cancel" : "Add Product";
  };

  return (
    <>
      <Button
        onClick={handleButtonClick}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        {getButtonMessage()}
      </Button>
      <Collapse in={open}>
        <div className="form card mt-3 pb-2">
          <div className="row mt-2">
            <div className="col-md-6">
              <FormTextField
                object={product}
                setObject={setProduct}
                title={"name"}
              />
            </div>
            <div className="col-md-6">
              <FormTextField
                object={product}
                setObject={setProduct}
                title={"manufacturer"}
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-12">
              <FormTextAreaField
                object={product}
                setObject={setProduct}
                title={"description"}
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-6">
              <FormNumberField
                object={product}
                setObject={setProduct}
                title={"basePrice"}
              />
            </div>
            <div className="col-md-6">
              <FormSelectField
                service={CategoryService}
                type={"categoryHashId"}
                title={"Category"}
                object={product}
                setObject={setProduct}
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-12">
              <FormImageField
                object={product}
                setObject={setProduct}
                title="image"
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="d-flex flex-row-reverse">
              <button
                type="button"
                className="btn btn-primary m-1"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Collapse>
    </>
  );
};

export default AddProduct;
