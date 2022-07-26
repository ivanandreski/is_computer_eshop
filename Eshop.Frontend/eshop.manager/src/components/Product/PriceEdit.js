import React from "react";

const PriceEdit = ({ object, setObject }) => {
  const handleChange = (e) => {
    let { value } = e.target;

    setObject({ ...object, basePrice: value });
  };

  return (
    <div className="row">
      <div className="col-md-5">
        <h5 className="mt-1">Price (in MKD):</h5>
      </div>
      <div className="col-md-7">
        <input
          type="number"
          min="1"
          className="form-control w-100"
          value={object.basePrice}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PriceEdit;
