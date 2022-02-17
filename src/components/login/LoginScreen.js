import { Alert, AlertTitle, Button, CircularProgress, Container } from "@mui/material";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import authService from "../auth/auth";
import { Navigate } from "react-router-dom";

const LoginScreen = () => {
  const [loginForm, setLoginForm] = useState({
    emailAddress: "",
    passcode: "",
  });

  // Loading state for button
  const [isLoading, setIsLoading] = useState(false);
  
  // Error state
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  // Form change handler
  const handleChange = (event) => {
    let target = event.target;
    setLoginForm({ ...loginForm, [target.name]: target.value });
  };

  const authenticationService = async () => {
    // Enable spinner
    setIsLoading(true);

    const response = await fetch(
      "https://projecthealthapp.herokuapp.com/api/users/login/",
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(loginForm),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response.json().then((data) => {
      if (data.status === "Success") {
        let localStorage = window.localStorage;
        localStorage.setItem("jwt", data.jwt);
        navigate("/home");
      } else {
        setError(true);
        // Remove spinner on login button when login fails
        setIsLoading(false);

        // Add code to handle errors and display error states and messages
      }
    });
  };

  return (
    // Render login screen when a user isn't authenticated, otherwise, navigate to home
    authService() ? (
      <Navigate to="/home" />
    ) : (

      isLoading ? 
      <Container sx={{
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}>
        <CircularProgress sx={{color: 'black'}}/>
      </Container> :
      <Container
        maxWidth="md"
        sx={{
          minHeight: "100vh",
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="hero_container"></div>
        <div>
          <h1>Login and start health + fun.</h1>
        </div>

        { error ? 
        <Alert severity="error">
          <AlertTitle>Email address or password mismatch</AlertTitle>
          Please re-enter your email address and password.
        </Alert> : <Container sx={{display: "none"}}/>
        }

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "99%" },
          }}
          validate
          autoComplete="on"
        >
          <p>Email address</p>
          <TextField
            id="email"
            type="email"
            label="Enter your email address"
            variant="outlined"
            name="emailAddress"
            value={loginForm.emailAddress}
            onChange={handleChange}
          />
          <p>Password</p>
          <TextField
            id="password"
            type="password"
            label="Enter your strong password"
            variant="outlined"
            name="passcode"
            value={loginForm.passcode}
            onChange={handleChange}
          />
        </Box>

        <div className="button-group">
          <Button
            className="button-loginScreen"
            variant="contained"
            onClick={authenticationService}
          >
            Login
          </Button>
        </div>
        <div>
          <p>I don't have an account yet. Register for a new account.</p>
        </div>
      </Container>
    )
  );
};

export default LoginScreen;
