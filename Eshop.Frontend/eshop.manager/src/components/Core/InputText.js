import React from "react";

const InputText = ({ object, setObject, title }) => {
  const handleChange = (e) => {
    const { value } = e.target;

    setObject({ ...object, [title]: value });
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <h5 className="mt-1">
          {title.charAt(0).toUpperCase() + title.slice(1)}:
        </h5>
      </div>
      <div className="col-md-8">
        <input
          type="text"
          className="form-control w-100"
          onChange={handleChange}
          value={object[title]}
        />
      </div>
    </div>
  );
};

export default InputText;
