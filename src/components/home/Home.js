import { Button } from "@mui/material";
import React from "react";
import { getUsers, logout } from "../auth/APIServices";
import { useState, useEffect } from "react";

const Home = () => {
  // Logic
  const [users, setUsers] = useState([{ userId: "Wat", emailAddress: "ana@gmail.com" }]);
  useEffect(() => {

    // Get users
    try {
      getUsers().then(data => setUsers(data.payload))

    } catch (error) {
      console.log("Error: Wrong data")
    }
    return () => {
      // Cleanup?
    };
  }, []);

  return (
    <div>



      <h1>Hello</h1>
      <Button onClick={logout}>Fork</Button>

    </div>
  );
};

export default Home;
