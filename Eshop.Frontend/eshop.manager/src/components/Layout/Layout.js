import React from "react";
import { Link, Outlet } from "react-router-dom";

import useLogout from "../../hooks/useLogout";
import Navbar from "./Navbar";

const Layout = () => {
  const logout = useLogout();

  return (
    <>
      <Navbar />

      <main className="App">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
