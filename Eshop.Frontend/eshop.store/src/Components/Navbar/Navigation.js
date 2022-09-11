import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Authenticate from "./Authenticate";

import "./Navbar.css";
import logo from "../../resources/images/logo.png";

const Navigation = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>
          <img src={logo} alt="" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto navbar-list w-50">
            <Nav.Item className="navbar-item">
              <Link to={"/"} className="navbar-item-text">
                HOME
              </Link>
            </Nav.Item>
            <Nav.Item className="navbar-item">
              <Link to={"/Shop"} className="navbar-item-text">
                SHOP
              </Link>
            </Nav.Item>
            <Nav.Item className="navbar-item">
              <Link to={"/Builder"} className="navbar-item-text">
                BUILDER
              </Link>
            </Nav.Item>
            <Nav.Item className="navbar-item">
              <Link to={"/forum/post"} className="navbar-item-text">
                FORUM
              </Link>
            </Nav.Item>
          </Nav>
          <Nav className="ms-auto">
            <Authenticate />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigation;
