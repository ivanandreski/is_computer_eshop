import React from "react";

const FormTextField = ({ object, setObject, id, title }) => {

  const handleValueChange = (e) => {
    const { value } = e.target;
    setObject({ ...object, [id]: value });
  };

  return (
    <div className="form-group mb-2">
      <label htmlFor="username">{title}:</label>
      <input
        type="text"
        id={id}
        className="form-control"
        value={object[id]}
        onChange={handleValueChange}
      />
    </div>
  );
};

export default FormTextField;
