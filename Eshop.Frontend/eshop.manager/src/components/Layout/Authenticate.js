import React from "react";
import { Link } from "react-router-dom";

import useLogout from "../../hooks/useLogout";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Authenticate = () => {
  const logout = useLogout();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return auth?.accessToken ? (
    <>
      <button className="btn btn-danger" onClick={signOut}>
        Logout
      </button>
    </>
  ) : (
    <>
      <Link to={"/login"} className="btn btn-primary">
        Log in
      </Link>
      <Link to={"/register"} className="btn btn-secondary">
        Register
      </Link>
    </>
  );
};

export default Authenticate;
