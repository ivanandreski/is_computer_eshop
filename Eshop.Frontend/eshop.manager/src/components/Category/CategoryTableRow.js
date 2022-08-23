import React from "react";

import CategoryApiService from "../../api/CategoryApiService";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import EditableField from "../Core/EditableField";

const CategoryTableRow = ({ element, categories, setCategories, i }) => {
  const axiosPrivate = useAxiosPrivate();
  const categoryApi = new CategoryApiService(axiosPrivate);

  const handleDelete = async () => {
    await categoryApi.deleteCategory(element.hashId);

    setCategories(categories.filter((c) => c.hashId !== element.hashId));
  };

  const handleSave = async (id, name) => {
    const response = await categoryApi.editCategory(element.hashId, name);
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
