import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";

import user from "../../resources/images/user.png";
import cart from "../../resources/images/shopping-cart.png";

import useLogout from "../../Hooks/useLogout";
import useAuth from "../../Hooks/useAuth";
import useRefreshToken from "../../Hooks/useRefreshToken";

const Authenticate = () => {
  const logout = useLogout();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const refresh = useRefreshToken();

  useEffect(() => {
    const checkToken = async () => {
      if (auth.accessToken === undefined) {
        try {
          await refresh();
        } catch (error) {
          console.log(error);
        }
      }
    };
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return auth?.accessToken ? (
    <>
      <Nav.Item>
        <Link to={"/Cart"}>
          <img src={cart} alt="" />
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to={"/Profile"}>
          <img src={user} alt="" className="profile"></img>
        </Link>
        <button className="btn btn-danger" onClick={signOut}>
          Logout
        </button>
      </Nav.Item>
    </>
  ) : (
    <>
      <Nav.Item>
        <Link to={"/login"} className="btn btn-primary">
          Log in
        </Link>
        <Link to={"/register"} className="btn btn-secondary ms-2">
          Register
        </Link>
      </Nav.Item>
    </>
  );
};

export default Authenticate;
