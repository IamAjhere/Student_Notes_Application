import React from "react";
import { Link, Outlet } from "react-router-dom";

function notespage() {
  return (
    <div>
      <nav className="navbar bg-light navbar-expand-lg navbar-lightS">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="list" className="nav-link">
              Notes Page
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="create-notes" className="nav-link">
              Create Notes
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default notespage;
