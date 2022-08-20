import React from "react";
import { Link } from "react-router-dom";

import Authenticate from "./Authenticate";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/product">Products</Link>
        </li>
        <li>
          <Link to="/category">Category</Link>
        </li>
        <li>
          <Link to="/store">Store</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <Authenticate />
      </ul>
    </nav>
  );
};

export default Navbar;
