import React from "react";

const DescriptionEdit = ({ object, setObject }) => {
  const handleChange = (e) => {
    const { value } = e.target;

    setObject({ ...object, description: value });
  };

  return (
    <div className="form-group">
      <h5>Description:</h5>
      <textarea
        className="form-control"
        value={object.description}
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default DescriptionEdit;
