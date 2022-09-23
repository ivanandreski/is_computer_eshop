import React, { useState } from "react";

import ProfileMenu from "./ProfileMenu";
import { menuItems } from "./ProfileMenu";
import ProfileDetails from "./ProfileDetails";
import ChangePassword from "./ChangePassword";
import EditDetails from "./EditDetails";
import Orders from "./Orders";
import UserPosts from "./UserPosts";
import UserComments from "./UserComments";

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
        return <UserPosts />;
      case menuItems.forumComments:
        return <UserComments />;
      default:
        return <ProfileDetails />;
    }
  };

  return (
    <div className="container mt-3">
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
