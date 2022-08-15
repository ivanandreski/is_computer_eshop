import React, { useState } from "react";
import CategoryService from "../../repository/CategoryService";
import TextInputField from "../Core/TextInputField";

const AddCategory = ({ elements, setElements }) => {
  const num = elements.length;

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleSave = () => {
    CategoryService.add(name).then((response) => {
      setElements([...elements, response.data]);
      setName("");
      setOpen(false);
    });
  };

  return open ? (
    <>
      <table className="table">
        <tbody>
          <tr>
            <th>{num + 1}</th>
            <th>
              <div className="row">
                <div className="col-md-10">
                  <TextInputField value={name} setValue={setName} />
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-primary w-100"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            </th>
            <th>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setName("");
                  setOpen(false);
                }}
              >
                Cancel
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    </>
  ) : (
    <>
      <button className="btn btn-primary" onClick={() => setOpen(true)}>
        <b>+</b>
      </button>
      <hr />
    </>
  );
};

export default AddCategory;
