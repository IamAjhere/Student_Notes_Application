import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Home from "../home";
import Login from "../login";
import InfoUpdate from "../infoupdate";

test("should render the home page", async () => {
  render(
    <Router>
      <Home />
    </Router>
  );
  const homeElement = screen.getByTestId("loginbutton");
  expect(homeElement).toBeInTheDocument();
  expect(homeElement).toHaveTextContent("Login");
});

test("should render the Info Login page", async () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const homeElement = screen.getByTestId("loginbutton");
  expect(homeElement).toBeInTheDocument();
  expect(homeElement).toHaveTextContent("Login");
});

test("should render the Login page", async () => {
  render(
    <Router>
      <InfoUpdate />
    </Router>
  );
  const homeElement = screen.getByTestId("updateButton");
  expect(homeElement).toBeInTheDocument();
  expect(homeElement).toHaveTextContent("Update");
});
