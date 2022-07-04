import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useAuth from "../../hooks/useAuth";
import Spinner from "react-bootstrap/Spinner";

import axios from "../../api/axios";
const UPDATE_URL = "/newstudent";

function Infoupdate() {
  const [password, setPassword] = useState("");
  const [dateofbirth, setDateofbirth] = useState(Date);
  const [mobile, setMobile] = useState(Number);
  const [errmsg, setErrormsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [successpage, setSuccesspage] = useState(false);
  const { auth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await axios.post(
        UPDATE_URL,
        JSON.stringify({
          status: true,
          accountType: "Student",
          dateOfBirth: dateofbirth,
          mobile: mobile,
          password: password,
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
      setSuccesspage(true);
    } catch (err) {
      setLoading(false);
      if (!err?.response) {
        setErrormsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrormsg(err.response?.data);
      }
    }
  };
  const loginpage = () => {
    navigate("/login", { replace: true });
  };
  return (
    <>
      {" "}
      <div className="d-flex justify-content-md-center align-items-center vh-100">
        <div className="shadow p-5 mb-5 bg-white rounded">
          {loading ? (
            <Spinner animation="border" />
          ) : successpage ? (
            <>
              <h4 className="text-success">
                Infomation Update Successful Login with your new password
              </h4>
              <button className="btn btn-primary" onClick={loginpage}>
                Login
              </button>
            </>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Label>Please Fill these Information</Form.Label>
              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="Date"
                  placeholder="Select Birth Day"
                  id="date"
                  onChange={(e) => setDateofbirth(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="Number"
                  placeholder="Enter Last Name"
                  id="Mobile"
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
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
                Update
              </Button>
            </Form>
          )}
        </div>
      </div>
    </>
  );
}

export default Infoupdate;
