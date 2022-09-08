import React from "react";

import "./style.css";

export const menuItems = {
  details: "details",
  changePassword: "changePassword",
  deleteAccount: "deleteAccount",
  editDetails: "editDetails",
  orders: "orders",
  forumPosts: "forumPosts",
  forumComments: "forumComments",
};

const ProfileMenu = ({ activeMenu, setActiveMenu }) => {
  const handleClick = (e) => {
    setActiveMenu(e.target.id);
  };

  return (
    <ul className="list-group">
      <li
        className="list-group-item profile-item"
        id={menuItems.details}
        onClick={handleClick}
      >
        Details
      </li>
      <li
        className="list-group-item profile-item"
        id={menuItems.editDetails}
        onClick={handleClick}
      >
        Edit Details
      </li>
      <li
        className="list-group-item profile-item"
        id={menuItems.changePassword}
        onClick={handleClick}
      >
        Change Password
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
        id={menuItems.forumPosts}
        onClick={handleClick}
      >
        Forum Posts
      </li>
      <li
        className="list-group-item profile-item"
        id={menuItems.forumComments}
        onClick={handleClick}
      >
        Forum Comments
      </li>
    </ul>
  );
};

export default ProfileMenu;
