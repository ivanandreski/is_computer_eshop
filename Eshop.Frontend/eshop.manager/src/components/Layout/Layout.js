import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      {/* <nav>
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
        </ul>
      </nav>

      <Outlet /> */}

      <main className="App">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
