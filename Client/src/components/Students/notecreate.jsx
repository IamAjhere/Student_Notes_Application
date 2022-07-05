import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Noteform from "./noteForm";
import axios from "../../api/axios";
import Spinner from "react-bootstrap/Spinner";
const NOTE_CREATE = "/note/create";

function Notecreate() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    setLoading(true);
    const response = await axios.post(
      NOTE_CREATE,
      {
        text: e,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": auth?.accessToken,
        },
        withCredentials: true,
      }
    );

    response ? navigate("../list") : response.json();
  };

  return (
    <>
      <div className="container">
        <div className="mt-3">
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <>
              <h3>Create Note</h3>
              <Noteform notes={""} onSubmit={onSubmit} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Notecreate;
