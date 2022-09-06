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

  const getInputField = () => {
    if (type === "textarea")
      return (
        <textarea
          id={id}
          className="form-control"
          value={object[id]}
          onChange={handleValueChange}
        ></textarea>
      );

    return (
      <input
        type={getType()}
        id={id}
        className="form-control"
        value={object[id]}
        onChange={handleValueChange}
      />
    );
  };

  return (
    <div className="form-group mb-2">
      <label htmlFor="username">{title}:</label>
      {getInputField()}
    </div>
  );
};

export default FormTextField;
