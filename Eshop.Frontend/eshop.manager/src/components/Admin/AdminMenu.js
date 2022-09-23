import React from "react";

import "./style.css";

export const menuItems = {
  users: "users",
  orders: "orders",
  uploadUsers: "uploadUsers",
};

const AdminMenu = ({ activeMenu, setActiveMenu }) => {
  const handleClick = (e) => {
    setActiveMenu(e.target.id);
  };

  return (
    <ul className="list-group">
      <li
        className="list-group-item profile-item"
        id={menuItems.users}
        onClick={handleClick}
      >
        Users
      </li>
      <li
        className="list-group-item profile-item"
        id={menuItems.orders}
        onClick={handleClick}
      >
        Orders
      </li>
      <li
        className="list-group-item profile-item"
        id={menuItems.uploadUsers}
        onClick={handleClick}
      >
        Upload Users
      </li>
    </ul>
  );
};

export default AdminMenu;
