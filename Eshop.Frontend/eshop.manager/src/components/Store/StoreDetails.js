import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getStore, editStore, getFormData } from "../../api/storeApi";
import Address from "../Core/Address";
import FormTextField from "../Core/FormTextField";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const StoreDetails = () => {
  const { hashId } = useParams();
  const axiosPrivate = useAxiosPrivate();

  const resetEdit = (s) => {
    return {
      name: s.name,
      city: s.address.city,
      country: s.address.country,
      zipCode: s.address.zipCode,
      street: s.address.street,
    };
  };

  const [store, setStore] = useState({});
  const [edit, setEdit] = useState(false);
  const [editedStore, setEditedStore] = useState({});

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await axiosPrivate.get(getStore(hashId));
        setStore(response.data);
        setEditedStore(resetEdit(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchStore();
  }, [hashId, axiosPrivate]);

  const handleSave = async () => {
    const formData = getFormData(editedStore);
    try {
      const response = await axiosPrivate.put(editStore(hashId), formData, {
        withCredentials: true,
      });
      setStore(response.data);
      setEditedStore(resetEdit(response.data));
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditedStore(resetEdit(store));
    setEdit(false);
  };

  const renderButtons = () => {
    return edit ? (
      <div className="row">
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={handleSave}>
            Save
          </button>
        </div>
        <div className="col-md-2">
          <button className="btn btn-danger w-100" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    ) : (
      <div className="row">
        <div className="col-md-2">
          <button
            className="btn btn-primary w-100"
            onClick={() => setEdit(true)}
          >
            Edit
          </button>
        </div>
      </div>
    );
  };

  const renderDetails = () => {
    return edit ? (
      <div className="form">
        <div className="row">
          <div className="row mt-2">
            <div className="col-md-6">
              <FormTextField
                object={editedStore}
                setObject={setEditedStore}
                title={"name"}
              />
            </div>
            <div className="col-md-6">
              <FormTextField
                object={editedStore}
                setObject={setEditedStore}
                title={"street"}
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-4">
              <FormTextField
                object={editedStore}
                setObject={setEditedStore}
                title={"country"}
              />
            </div>
            <div className="col-md-4">
              <FormTextField
                object={editedStore}
                setObject={setEditedStore}
                title={"city"}
              />
            </div>
            <div className="col-md-4">
              <FormTextField
                object={editedStore}
                setObject={setEditedStore}
                title={"zipCode"}
              />
            </div>
          </div>
        </div>
      </div>
    ) : (
      <>
        <div className="row">
          <div className="col-md-6">
            <h5>Name:</h5>
            <p>{store.name}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Address address={store.address} />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="container">
        {renderButtons()}
        {renderDetails()}
      </div>
    </>
  );
};

export default StoreDetails;
