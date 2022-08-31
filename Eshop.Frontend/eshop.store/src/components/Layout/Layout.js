import React from "react";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter,Routes } from "react-router-dom";
const Layout = () => {
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route exact path="/DNICH_TFT" element={<Home />} />
        <Route exact path="/DNICH_TFT/champions" element={<Champions />} />
        <Route path="/DNICH_TFT/champions/:champ" element={<ChampionView />} />
        <Route exact path="/DNICH_TFT/items" element={<Items />} />
        <Route path="/DNICH_TFT/items/:item" element={<ItemView />} />
        <Route path="/DNICH_TFT/comps" element={<Comps />}></Route>
        <Route path="/DNICH_TFT/quiz" element={<Quiz />}></Route> */}
      </Routes>
    </BrowserRouter>
  </>
  );
};

export default Layout;
