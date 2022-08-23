import React, { useEffect, useState } from "react";
import TextInputField from "./TextInputField";

const EditableField = ({ id, originalValue, handleSave }) => {
  const [value, setValue] = useState(originalValue);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setValue(originalValue);
    setIsEdit(false);
  }, [originalValue]);

  const renderButton = () => {
    if (isEdit) {
      return (
        <button
          className="btn btn-primary w-100"
          onClick={() => {
            setIsEdit(false);
            handleSave(id, value);
          }}
        >
          Save
        </button>
      );
    }

    return (
      <button
        className="btn btn-secondary w-100"
        onClick={() => {
          setIsEdit(true);
        }}
      >
        Edit
      </button>
    );
  };

  return isEdit ? (
    <>
      <div className="row">
        <div className="col-md-10">
          <TextInputField value={value} setValue={setValue} />
        </div>
        <div className="col-md-2">{renderButton()}</div>
      </div>
    </>
  ) : (
    <>
      <div className="row">
        <div className="col-md-10">
          <input className="form-control" readOnly disabled value={value} />
        </div>
        <div className="col-md-2">{renderButton()}</div>
      </div>
    </>
  );
};

export default EditableField;
