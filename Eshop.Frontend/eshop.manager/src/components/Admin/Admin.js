import React, { useState } from "react";
import Users from "../Users/Users";
import AdminMenu from "./AdminMenu";

import { menuItems } from "./AdminMenu";
import Orders from "./Orders";
import UploadUsers from "./UploadUsers";

const Admin = () => {
  const [activeMenu, setActiveMenu] = useState(menuItems.users);

  const renderMenuItem = () => {
    switch (activeMenu) {
      case menuItems.users:
        return <Users />;
      case menuItems.orders:
        return <Orders />;
      case menuItems.uploadUsers:
        return <UploadUsers />;
      // case menuItems.forumPosts:
      //   return <UserPosts />;
      // case menuItems.forumComments:
      //   return <UserComments />;
      default:
        return <Users />;
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-4">
          <AdminMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        </div>
        <div className="col-md-8">{renderMenuItem()}</div>
      </div>
    </div>
  );
};

export default Admin;
