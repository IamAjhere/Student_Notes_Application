import React from "react";
import { Link } from "react-router-dom";

function home() {
  return (
    <div className="d-flex justify-content-md-center align-items-center vh-100 ">
      <Link className="btn btn-primary p-5 shadow rounded" to="/login">
        Login
      </Link>
    </div>
  );
}

export default home;
