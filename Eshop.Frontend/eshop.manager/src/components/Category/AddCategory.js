import React, { useState } from "react";

import CategoryApiService from "../../api/CategoryApiService";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import TextInputField from "../Core/TextInputField";

const AddCategory = ({ categories, setCategories }) => {
  const axiosPrivate = useAxiosPrivate();
  const categoryApi = new CategoryApiService(axiosPrivate);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleSave = async () => {
    try {
      const response = await categoryApi.addCategory(name);
      setName("");
      setOpen(false);
      setCategories([...categories, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return open ? (
    <>
      <table className="table">
        <tbody>
          <tr>
            <th>{(categories?.data?.length || 0) + 1}</th>
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
