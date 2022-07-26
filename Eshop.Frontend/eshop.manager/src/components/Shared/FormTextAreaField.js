import React from "react";

const FormDescriptionField = ({ object, setObject, title }) => {
  const handleChange = (e) => {
    const { value } = e.target;

    setObject({ ...object, [title]: value });
  };

  return (
    <>
      <div className="form-group">
        <h5>{title.charAt(0).toUpperCase() + title.slice(1)}:</h5>
        <textarea
          className="form-control"
          onChange={handleChange}
          value={object[title]}
        ></textarea>
      </div>
    </>
  );
};

export default FormDescriptionField;
