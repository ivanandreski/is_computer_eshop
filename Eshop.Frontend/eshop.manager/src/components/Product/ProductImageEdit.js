import React, { useState } from "react";

import ProductApiService from "../../api/ProductApService";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ProductImageEdit = ({ product, setProduct }) => {
  const axiosPrivate = useAxiosPrivate();
  const productApi = new ProductApiService(axiosPrivate);

  const [newImages, setNewImages] = useState({});

  const handleDelete = async (hashId) => {
    try {
      const response = await productApi.deleteImageForProduct(hashId);
      setProduct(response.data);
    } catch (error) {
        console.log(error);
    }
  };

  const handleSubmit = async () => {
      try {
        const response = await productApi.addImagesToProduct(product.hashId, newImages);
        setProduct(response.data);
      } catch (error) {
          console.log(error);
      }
  };

  const renderImages = () => {
    return product.images.map((image, i) => (
      <div className="col-md-3" key={i}>
        <img
          src={`data:image/jpeg;base64,${image.image}`}
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
