import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

const Home = () => {
  return (
    <div className="row">
      <div className="col-md-4 home p-3">
        <h1 className="text-light">Home</h1>
        <h3 className="text-light">You are logged in!</h3>
        <div className="row">
          <div className="col-md-12">
            <Link to="/product">Products</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Link to="/category">Category</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Link to="/store">Store</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Link to="/admin">Admin</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <button className="btn btn-primary">Sign out!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
