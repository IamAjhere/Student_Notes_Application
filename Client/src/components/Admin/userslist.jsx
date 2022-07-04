import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import Spinner from "react-bootstrap/Spinner";
const USER_LIST = "/read";

function Userlist() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    //get the list of  students
    const fetchItems = async () => {
      setLoading(true);
      const response = await axios.get(USER_LIST, {
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
  }, [auth]);

  return (
    <div className="container">
      <div className="mt-3">
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <>
            <h3>Users List</h3>
            <table className="table table-hover mt-3 table-fixed">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {items.map((users) => (
                  <tr key={users._id}>
                    <td>
                      {users.firstName} {users.lastName}
                    </td>
                    <td>{users.email}</td>
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

export default Userlist;
