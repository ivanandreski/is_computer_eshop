import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../Navbar/Navigation";
import Footer from '../Footer/Footer'
const Layout = () => {
  return (
    <>
      <Navbar />

      <main className="App">
        <Outlet />
      </main>

      <Footer/>
    </>
  );
};

export default Layout;
