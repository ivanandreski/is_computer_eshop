import React, { useState } from "react";

import ProfileMenu from "./ProfileMenu";
import { menuItems } from "./ProfileMenu";
import ProfileDetails from "./ProfileDetails";
import ChangePassword from "./ChangePassword";
import EditDetails from "./EditDetails";
import Orders from "./Orders";
import PageNotDeveloped from "../Error/PageNotDeveloped";

const Profile = () => {
  const [activeMenu, setActiveMenu] = useState(menuItems.details);

  const renderMenuItem = () => {
    switch (activeMenu) {
      case menuItems.editDetails:
        return <EditDetails setActiveMenu={setActiveMenu} />;
      case menuItems.changePassword:
        return <ChangePassword />;
      case menuItems.orders:
        return <Orders />;
      case menuItems.forumPosts:
        return <PageNotDeveloped />;
      case menuItems.forumComments:
        return <PageNotDeveloped />;
      default:
        return <ProfileDetails />;
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <ProfileMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        </div>
        <div className="col-md-8">{renderMenuItem()}</div>
      </div>
    </div>
  );
};

export default Profile;