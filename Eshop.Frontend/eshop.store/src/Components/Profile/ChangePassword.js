import React, { useState } from "react";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import UserApiService from "../../api/UserApiService";
import useLogout from "../../Hooks/useLogout";
import FormTextField from "../Core/FormTextField";

const ChangePassword = () => {
  const logout = useLogout();
  const axiosPrivate = useAxiosPrivate();
  const userApi = new UserApiService(axiosPrivate);

  const [changePassword, setChangePassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await userApi.changePassword(changePassword);
      await logout();
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        setError(error.response?.data);
      } else {
        setError("Something went wrong!");
      }
    }
  };

  return (
    <div className="card p-4">
      <strong className="text-danger">{error}</strong>
      <form onSubmit={handleSubmit}>
        <FormTextField
          object={changePassword}
          setObject={setChangePassword}
          type="password"
          id="currentPassword"
          title="Current Password"
        />
        <FormTextField
          object={changePassword}
          setObject={setChangePassword}
          type="password"
          id="newPassword"
          title="New Password"
        />
        <FormTextField
          object={changePassword}
          setObject={setChangePassword}
          type="password"
          id="confirmPassword"
          title="Confirm New Password"
        />
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
