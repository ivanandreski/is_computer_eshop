import React from "react";

import EditableField from "../Core/EditableField";

const CategoryTableRow = ({ element, saveValue, handleDelete, i }) => {
  return (
    <tr>
      <th>{i + 1}</th>
      <td>
        <EditableField
          originalValue={element.name}
          saveValue={saveValue}
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
