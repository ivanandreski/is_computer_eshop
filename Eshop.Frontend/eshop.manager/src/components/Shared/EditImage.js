import React from "react";

const EditImage = ({ object, setObject, title }) => {
  const handleChange = (e) => {
    const { value } = e.target;

    setObject({ ...object, value });
  };

  return (
    <>
      <div className="form-group">
        <h5>Image:</h5>
        <input
          className="form-control"
          type="file"
          value={object.image}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default EditImage;
