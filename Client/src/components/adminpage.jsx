import React from "react";
import { Link, Outlet } from "react-router-dom";
function userslist() {
  return (
    <div>
      <nav className="navbar bg-light navbar-expand-lg navbar-lightS">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/adminpage/users" className="nav-link">
              Users
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="register" className="nav-link">
              Register
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default userslist;
