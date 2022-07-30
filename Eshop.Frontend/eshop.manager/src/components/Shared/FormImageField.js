import React from "react";

const FormImageField = ({ object, setObject, title }) => {
  const handleChange = (e) => {
    const { files } = e.target;

    const image = [...object["image"], files];

    setObject({ ...object, image });
  };

  return (
    <>
      <div className="form-group">
        <h5>Image:</h5>
        <input
          className="form-control"
          multiple
          type="file"
          //   value={object.image}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default FormImageField;
