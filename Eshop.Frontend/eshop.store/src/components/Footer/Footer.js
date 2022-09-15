import React from "react";
import copy from "../../resources/images/copyright.png";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer-custom">
      <img className="copyright" src={copy} alt=""></img>
      2022 PC Rakish Coorp. All rights reserved
    </div>
  );
};

export default Footer;
