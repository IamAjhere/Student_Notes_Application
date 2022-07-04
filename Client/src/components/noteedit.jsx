import React, { useState, useEffect } from "react";
import Noteform from "./noteForm";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import Spinner from "react-bootstrap/Spinner";

function Noteedit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState("");
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //get the note data to input field
    const fetchItemID = async () => {
      setLoading(true);
      const response = await axios.get(`/note/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": auth?.accessToken,
        },
        withCredentials: true,
      });
      setLoading(false);
      setNote(response.data);
    };

    fetchItemID();
  }, [auth, id]);
  //update the data
  const onSubmit = async (text) => {
    setLoading(true);
    const response = await axios.post(
      `/note/${id}`,
      {
        text: text,
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

  return note ? (
    <div className="container">
      <div className="mt-3">
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <>
            <h3>Edit Note</h3>
            <Noteform notes={note} onSubmit={onSubmit} />
          </>
        )}
      </div>
    </div>
  ) : (
    <>Loading</>
  );
}
export default Noteedit;
