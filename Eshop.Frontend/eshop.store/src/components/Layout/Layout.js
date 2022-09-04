import React from "react";
<<<<<<< HEAD
import { Outlet } from "react-router-dom";

import Navbar from "../Navbar/Navigation";

const Layout = () => {
  return (
    <>
      <Navbar />

      <main className="App">
        <Outlet />
      </main>
=======
import Navbar from "../Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import "./Layout.css";
import Footer from "../Footer/Footer";
const Layout = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="main-container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            {/* <Route exact path="/DNICH_TFT/champions" element={<Champions />} />
        <Route path="/DNICH_TFT/champions/:champ" element={<ChampionView />} />
        <Route exact path="/DNICH_TFT/items" element={<Items />} />
        <Route path="/DNICH_TFT/items/:item" element={<ItemView />} />
        <Route path="/DNICH_TFT/comps" element={<Comps />}></Route>
        <Route path="/DNICH_TFT/quiz" element={<Quiz />}></Route> */}
          </Routes>
        </div>
        <Footer></Footer>
      </BrowserRouter>
>>>>>>> master
    </>
  );
};

export default Layout;
