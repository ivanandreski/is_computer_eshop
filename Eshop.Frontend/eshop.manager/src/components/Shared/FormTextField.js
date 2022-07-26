import React from "react";

const FormTextField = ({ object, setObject, title }) => {
  const handleChange = (e) => {
    const { value } = e.target;

    setObject({ ...object, [title]: value });
  };

  return (
    <>
      <div className="form-group">
        <h5>
          {title.charAt(0).toUpperCase() + title.slice(1)}:
        </h5>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={object[title]}
        />
      </div>
    </>
  );
};

export default FormTextField;
