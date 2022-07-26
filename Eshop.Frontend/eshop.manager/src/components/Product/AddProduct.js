import React, { useState } from "react";
import FormTextField from "../Shared/FormTextField";
import FormTextAreaField from "../Shared/FormTextAreaField";
import FormNumberField from "../Shared/FormNumberField";

const AddProduct = ({ entities, setEntities }) => {
  const [product, setProduct] = useState({
    name: "",
    manufacturer: "",
    description: "",
    basePrice: "",
    categoryHashId: "",
    discontinued: false,
    image: "",
  });

  const handleSave = () => {
    console.log(product);
  };

  return (
    <>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add Product
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="form">
              <div className="row">
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

              <div className="row">
                <div className="col-md-9">
                  <FormTextAreaField
                    object={product}
                    setObject={setProduct}
                    title={"description"}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <FormNumberField
                    object={product}
                    setObject={setProduct}
                    title={"basePrice"}
                  />
                </div>
                <div className="col-md-6">{/* category placeholder */}</div>
              </div>

              <div className="row">
                <div className="d-flex justify-content-center col-md-6">
                  {/* image placeholder */}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
