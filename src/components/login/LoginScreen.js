import { Alert, AlertTitle, Button, CircularProgress, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import authService from "../auth/auth";
import { Navigate, Link } from "react-router-dom";
import { getAnalytics, logEvent } from "firebase/analytics";
import { initializeApp } from "firebase/app";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD88HpnqsSRni91xOZOqvG_1nRDOErdoYg",
  authDomain: "healevate-c3688.firebaseapp.com",
  projectId: "healevate-c3688",
  storageBucket: "healevate-c3688.appspot.com",
  messagingSenderId: "798975874598",
  appId: "1:798975874598:web:c5814636dcd645312b38e7",
  measurementId: "G-7ZBZF5PN0V"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const analytics = getAnalytics();

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
      "http://localhost:8080/api/users/login/",
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
        logEvent(analytics, 'login');
        navigate("/app/onboarding/1");
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
      <Navigate to="/" />
    ) : (

      isLoading ?
        <Container sx={{
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}>
          <CircularProgress sx={{ color: 'black' }} />
        </Container> :
        <Container
          maxWidth="md"
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: 'space-between',
            px: '1em',
            pb: '1em',
            pt: '2em'
          }}
        >
          <Box>
            <Grid container sx={{}} direction="row" columnSpacing={2} alignItems="center" mb="1em">
              <Grid item xs={2} sx={{ width: 'auto' }}>
                <img alt="Healevate logo, cross made of cards" src={require('../../assets/img/healevate-logo.png')} width="100%" height="100%" />

              </Grid>
              <Grid item>

              </Grid>
              <Typography variant='logo'>healevate</Typography>
            </Grid>
            <div>
              <Typography sx={{ mb: '1.5em' }} variant='loginHeader' component='h1' >Login and start health + fun.</Typography>
            </div>

            {error ?
              <Alert severity="error">
                <AlertTitle>Email address or password mismatch</AlertTitle>
                Please re-enter your email address and password.
              </Alert> : <Container sx={{ display: "none" }} />
            }

            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "99%" },
              }}
              validate
              autoComplete="on"
            >
              <Typography variant='subtitle1' component='p' mb={1} >Email address</Typography>
              <TextField
                id="email"
                type="email"
                label="Enter your email address"
                variant="outlined"
                name="emailAddress"
                value={loginForm.emailAddress}
                onChange={handleChange}
                sx={{ pb: '1.5em' }}
              />
              <Typography variant='subtitle1' component='p' mb={1} >Password</Typography>
              <TextField
                id="password"
                type="password"
                label="Enter your strong password"
                variant="outlined"
                name="passcode"
                value={loginForm.passcode}
                onChange={handleChange}
                sx={{ pb: '3em' }}

              />
            </Box>
            <div>
              <Button
                variant="contained"
                onClick={authenticationService}
                fullWidth
              >
                Login
              </Button>
            </div>
          </Box>

          <Box>

            <Box>
              <Typography variant="loginSubtext" component="p">I don't have an account yet.  <Link to="/app/registration" style={{ color: "black", textDecoration: "none" }}><strong>Register for a new account.</strong></Link></Typography>
            </Box>
          </Box>

        </Container>

    )
  );
};

export default LoginScreen;