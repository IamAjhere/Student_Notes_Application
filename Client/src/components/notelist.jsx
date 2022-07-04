import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import Spinner from "react-bootstrap/Spinner";
const NOTE_LIST = "/note/read";

function Notelist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    //get the list of notes for the student
    const fetchItems = async () => {
      setLoading(true);
      const response = await axios.get(NOTE_LIST, {
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": auth?.accessToken,
        },
        withCredentials: true,
      });
      setLoading(false);
      setItems(response.data);
    };
    fetchItems();
  }, [auth, refresh]);

  const deletenote = async (id) => {
    await axios.get(`/note/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": auth?.accessToken,
      },
      withCredentials: true,
    });
    refresh ? setRefresh(false) : setRefresh(true);
  };

  return (
    <div className="container">
      <div className="mt-3">
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <>
            <h3>Notes List</h3>
            <table className="table table-hover mt-3 table-fixed">
              <thead>
                <tr>
                  <th>Text</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((notes) => (
                  <tr key={notes._id}>
                    <td> {notes.text}</td>
                    <td>
                      <Link
                        className="btn btn-primary m-2"
                        to={`../edit-notes/${notes._id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger m-2"
                        onClick={() => deletenote(notes._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default Notelist;
