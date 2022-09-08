import React, { useEffect, useState } from "react";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import useLogout from "../../Hooks/useLogout";
import UserApiService from "../../api/UserApiService";
import { menuItems } from "./ProfileMenu";
import FormTextField from "../Core/FormTextField";
import AddressSelector from "../Core/AddressSelector";

const EditDetails = ({ setActiveMenu }) => {
  const axiosPrivate = useAxiosPrivate();
  const userApi = new UserApiService(axiosPrivate);
  const logout = useLogout();

  const [profileDetails, setProfileDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await userApi.getDetails();
        setProfileDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (profileDetails.username === "") {
      setError("Username cannot be empty!");
      return;
    }

    if (profileDetails.email === "") {
      setError("Email cannot be empty!");
      return;
    }

    try {
      const response = await userApi.editDetails(profileDetails);
      setProfileDetails(response.data.details);

      if (response.data.usernameChange) {
        await logout();
      }

      setActiveMenu(menuItems.details);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400) {
        setError(error.response?.data);
      } else {
        setError("Something went wrong!");
      }
    }
  };

  const handleCancel = () => {
    setActiveMenu(menuItems.details);
  };

  return profileDetails == null ? (
    <></>
  ) : (
    <div className="card p-4">
      <strong className="text-danger">{error}</strong>
      <form className="form" onSubmit={handleSubmit}>
        <FormTextField
          object={profileDetails}
          setObject={setProfileDetails}
          id="username"
          title="Username"
        />
        <FormTextField
          object={profileDetails}
          setObject={setProfileDetails}
          id="email"
          title="Email"
        />
        <FormTextField
          object={profileDetails}
          setObject={setProfileDetails}
          id="firstName"
          title="First Name"
        />
        <FormTextField
          object={profileDetails}
          setObject={setProfileDetails}
          id="lastName"
          title="Last Name"
        />
        <FormTextField
          object={profileDetails}
          setObject={setProfileDetails}
          id="phone"
          title="Phone Number"
        />
        <AddressSelector
          object={profileDetails}
          setObject={setProfileDetails}
        />
        <div className="form-group mb-2">
          <button type="submit" className="btn btn-primary w-100">
            Save
          </button>
        </div>
      </form>
      <button className="btn btn-secondary" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
};

export default EditDetails;
