import React from "react";

import {
  deleteCategory,
  editCategory,
  getFormData,
} from "../../api/categoryApi";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import EditableField from "../Core/EditableField";

const CategoryTableRow = ({ element, categories, setCategories, i }) => {
  const axiosPrivate = useAxiosPrivate();

  const handleDelete = async () => {
    await axiosPrivate.delete(deleteCategory(element.hashId), {
      withCredentials: true,
    });

    setCategories(categories.filter((c) => c.hashId !== element.hashId));
  };

  const handleSave = async (id, name) => {
    const formData = getFormData(name);

    const response = await axiosPrivate.put(editCategory(id), formData, {
      withCredentials: true,
    });

    const temp = categories.filter((c) => c.hashId !== id);

    setCategories([...temp, response.data]);
  };

  return (
    <tr>
      <th>{i + 1}</th>
      <td>
        <EditableField
          originalValue={element.name}
          handleSave={handleSave}
          id={element.hashId}
        />
      </td>
      <td>
        <button
          className="btn btn-danger"
          value={element.hashId}
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default CategoryTableRow;
