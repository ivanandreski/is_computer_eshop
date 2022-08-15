import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";

import StoreService from "../../repository/StoreService";
import FormTextField from "../Core/FormTextField";

const Stores = () => {
  const clearForm = () => {
    return {
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    };
  };

  const [entities, setEntities] = useState([]);
  const [store, setStore] = useState(clearForm());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetch = () => {
      StoreService.fetchAll()
        .then((resp) => {
          setEntities(resp.data);
        })
        .catch((error) => console.log(error));
    };
    fetch();
  }, []);

  const getButton = () => {
    if (!open) {
      return (
        <Button
          onClick={() => setOpen(true)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          +
        </Button>
      );
    }
  };

  const handleDelete = (hashId) => {
    StoreService.delete(hashId)
      .then((resp) => {
        setEntities(entities.filter((e) => e.hashId !== hashId));
      })
      .catch((error) => console.log(error));
  };

  const handleSave = () => {
    StoreService.add(store)
      .then((resp) => {
        setStore(clearForm());
        setEntities([...entities, resp.data]);
        setOpen(false);
      })
      .catch((error) => console.log(error));
  };

  const handleCancel = () => {
    setStore(clearForm());
    setOpen(false);
  };

  const renderStores = () => {
    return entities.map((entity, i) => (
      <tr key={i}>
        <th>{i + 1}</th>
        <td>{entity.name}</td>
        <td>{entity.address.city}</td>
        <td>
          <div className="row">
            <div className="col-md-2">
              <Link
                to={`/store/${entity.hashId}`}
                className="btn btn-secondary w-100"
              >
                Details
              </Link>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-danger w-100"
                onClick={() => handleDelete(entity.hashId)}
              >
                Delete
              </button>
            </div>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>City</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderStores()}</tbody>
          </table>
          <div className="col-md-12">
            {getButton()}
            <Collapse in={open}>
              <div className="row">
                <div className="row mt-2">
                  <div className="col-md-6">
                    <FormTextField
                      object={store}
                      setObject={setStore}
                      title={"name"}
                    />
                  </div>
                  <div className="col-md-6">
                    <FormTextField
                      object={store}
                      setObject={setStore}
                      title={"country"}
                    />
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-md-4">
                    <FormTextField
                      object={store}
                      setObject={setStore}
                      title={"street"}
                    />
                  </div>
                  <div className="col-md-4">
                    <FormTextField
                      object={store}
                      setObject={setStore}
                      title={"city"}
                    />
                  </div>
                  <div className="col-md-4">
                    <FormTextField
                      object={store}
                      setObject={setStore}
                      title={"zipCode"}
                    />
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-md-2">
                    <button
                      className="btn btn-primary w-100"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </div>
                  <div className="col-md-2">
                    <button
                      className="btn btn-danger w-100"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Collapse>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default Stores;
