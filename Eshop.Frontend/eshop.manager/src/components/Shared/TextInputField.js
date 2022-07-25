import React, {  } from "react";

const TextInputField = ({ value, setValue }) => {
  return (
    <input
      type="text"
      className="form-control"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default TextInputField;
