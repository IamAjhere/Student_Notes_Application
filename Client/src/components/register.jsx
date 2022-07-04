import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useAuth from "../hooks/useAuth";
import Spinner from "react-bootstrap/Spinner";

import axios from "../api/axios";
const REGISTER_URL = "/register";

function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [errmsg, setErrormsg] = useState("");
  const [sucmsg, setSuccessmsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          email: email,
          firstName: firstName,
          lastName: lastName,
          status: false,
          accountType: "NewStudent",
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": auth?.accessToken,
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      setErrormsg(null);
      setSuccessmsg(response?.data);
    } catch (err) {
      setLoading(false);
      if (!err?.response) {
        setErrormsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrormsg(err.response?.data);
      }
    }
  };
  return (
    <>
      <div className="d-flex justify-content-md-center align-items-center vh-100">
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <div className="shadow p-5 mb-5 bg-white rounded">
            <Form onSubmit={handleSubmit}>
              <Form.Label className="text-center">
                Register New Student
              </Form.Label>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter First Name"
                  id="fName"
                  onChange={(e) => setFname(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Last Name"
                  id="lName"
                  onChange={(e) => setLname(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Form.Text className="text-danger">{errmsg}</Form.Text>
                <Form.Text className="text-success">{sucmsg}</Form.Text>
              </Form.Group>

              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
          </div>
        )}
      </div>
    </>
  );
}

export default Register;
