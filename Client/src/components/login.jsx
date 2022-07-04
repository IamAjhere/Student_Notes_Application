import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import Spinner from "react-bootstrap/Spinner";

//axios
const LOGIN_URL = "/login";

function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errmsg, setErrormsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: email, password: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      //set Auth token with email and password in the context
      const accessToken = response?.data?.Access_Token;
      const role = response?.data?.accountType;
      setAuth({ email, password, role, accessToken });

      //redirect each users by their accountType
      if (role[0] === "NewStudent")
        return navigate("/infoupdate", { replace: true });
      if (role[0] === "Admin")
        return navigate("/adminpage/users", { replace: true });
      if (role[0] === "Student")
        return navigate("/notes/list", { replace: true });

      navigate(from, { replace: true });
    } catch (err) {
      setLoading(false);
      if (!err?.response) {
        setErrormsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrormsg("Invalid Username or Password");
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-md-center align-items-center vh-100 ">
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <div className="shadow p-5 mb-5 bg-white rounded">
            <Form onSubmit={handleSubmit}>
              <Form.Label className="text-center">LOGIN</Form.Label>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Form.Text className="text-danger">{errmsg}</Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
