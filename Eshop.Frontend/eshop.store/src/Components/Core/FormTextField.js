import React from "react";

const FormTextField = ({ object, setObject, id, title, type }) => {
  const handleValueChange = (e) => {
    const { value } = e.target;
    setObject({ ...object, [id]: value });
  };

  const getType = () => {
    if (type === undefined) return "text";

    return type;
  };

  return (
    <div className="form-group mb-2">
      <label htmlFor="username">{title}:</label>
      <input
        type={getType()}
        id={id}
        className="form-control"
        value={object[id]}
        onChange={handleValueChange}
      />
    </div>
  );
};

export default FormTextField;
