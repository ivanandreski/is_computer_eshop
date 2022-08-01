import React, { useState } from "react";

import ProductService from "../../repository/ProductService";

const ProductImageEdit = ({ product, setProduct }) => {
  const [newImages, setNewImages] = useState({});

  const handleDelete = (hashId) => {
    ProductService.deleteImage(hashId)
      .then((resp) => {
        setProduct(resp.data);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = () => {
    ProductService.addImages(product.hashId, newImages)
      .then((resp) => {
        setProduct(resp.data);
      })
      .catch((error) => console.log(error));
  };

  const renderImages = () => {
    return product.images.map((image, i) => (
      <div className="col-md-3" key={i}>
        <img
          src={`data:image/jpeg;base64,${image.image}`}
          //   className="d-block"
          width="90%"
          alt="..."
        />
        <div
          className=""
          style={{ display: "inline" }}
          onClick={() => handleDelete(image.hashId)}
        >
          X
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="row">{renderImages()}</div>
      <div className="row">
        <div className="col-md-12">
          <input
            type="file"
            multiple
            onChange={(e) => setNewImages(e.target.files)}
          />
          <button className="btn btn-primary" onClick={handleSubmit}>
            Add Images
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductImageEdit;
