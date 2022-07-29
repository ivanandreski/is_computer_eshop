import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import StoreService from "../../repository/StoreService";

import "./css/productInStore.css";

const ProductInStore = ({ productInStore, save }) => {
  const resetForm = () => {
    return productInStore.quantity;
  };

  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(resetForm());

  const handleSave = () => {
    let quantity = form;
    if (form < 0) quantity = 0;

    StoreService.addProduct(productInStore.hashId, quantity)
      .then((resp) => {
        setEdit(false);
        save([]);
      })
      .catch((error) => console.log(error));
  };

  const handleReset = () => {
    setForm(resetForm());
    setEdit(false);
  };

  const renderAvailability = () => {
    return productInStore.available ? (
      <span className="text-success fw-bold">✓</span>
    ) : (
      <span className="text-danger fw-bold">X</span>
    );
  };

  return (
    <>
      <div onClick={() => setEdit(!edit)} className="pointer">
        <span className="fw-bold">{productInStore.store.name}: </span>
        {renderAvailability()}
      </div>
      <Collapse in={edit}>
        <span>
          <div className="row mt-2">
            <div className="col-md-4">
              <h5>Quantity:</h5>
            </div>
            <div className="col-md-8">
              <input
                className="form-control"
                type="number"
                min={1}
                value={form}
                onChange={(e) => setForm(e.target.value)}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-6">
              <button className="btn btn-primary w-100" onClick={handleSave}>
                Save
              </button>
            </div>
            <div className="col-md-6">
              <button className="btn btn-danger w-100" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>
        </span>
      </Collapse>
    </>
  );
};

export default ProductInStore;
