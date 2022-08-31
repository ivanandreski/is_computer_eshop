import React from "react";
import "./Navbar.css";
import logo from "../../resources/images/logo.png";
import user from "../../resources/images/user.png";
import cart from "../../resources/images/shopping-cart.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <img src={logo} className="logo"></img>
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link
              // onClick={changeActive}
              // className={`link-${activeLink === "Home" ? "active" : ""}`}
              to={"/"}
            >
              HOME
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              // onClick={changeActive}
              // className={`link-${activeLink === "Champions" ? "active" : ""}`}
              to={"/Shop"}
            >
              SHOP
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              // onClick={changeActive}
              // className={`link-${activeLink === "Items" ? "active" : ""}`}
              to={"/Builder"}
            >
              BUILDER
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              // onClick={changeActive}
              // className={`link-${activeLink === "Final Comps" ? "active" : ""}`}
              to={"/Forum"}
            >
              FORUM
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <Link to={"/Profile"}>
          <img src={user} className="profile"></img>
        </Link>
        <Link to={"/Cart"}>
          <img src={cart} className="shopping-cart"></img>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
