import { Alert, AlertTitle, Button, CircularProgress, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import authService from "../auth/auth";
import { Navigate, Link } from "react-router-dom";
import { getAnalytics, logEvent } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { createTheme, ThemeProvider } from "@mui/system";




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

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#F9AB10",
    },
    secondary: {
      main: "#d3f76c",
    },
    red: {
      main: "#6F0000"
    },
    green: {
      main: "#7A8D44"
    }
  },
  typography: {
    fontFamily: '"Poppins" ,"Roboto", "Helvetica", "Arial", "Josefin Sans", sans-serif',
    bigHeading: {
      fontSize: '2.25rem',
      lineHeight: '1.25',
      fontWeight: '800',
      width: '80%',
      color: '#624100',
      '@media (max-width: 376px)': {
        fontSize: '1.75rem',
      }
    },
    bigHeadingSub: {
      fontSize: '1.5rem',
      lineHeight: '1.25',
      fontWeight: 'normal',
      width: '80%',
      color: '#624100',
      '@media (max-width: 376px)': {
        fontSize: '1.17rem',
      }
    },
    subtitle1: {
      fontSize: '1.15rem',
      color: '#624100',
      width: '80%',
      lineHeight: '1.25',
      '@media (max-width:376px)': {
        fontSize: '1.10rem',
      },


    },
    subtitle1B: {
      fontSize: '1.15rem',
      color: '#624100',
      width: '80%',
      lineHeight: 'normal',
      fontWeight: 'bold',
      '@media (max-width:376px)': {
        fontSize: '1.10rem',
      },
    }, bigRegistration: {
      fontSize: '2.75rem',
      color: '#624100',
      lineHeight: '121.5%',
      fontWeight: '900',
      '@media (max-width:376px)': {
        fontSize: '2.5rem'
      },
    },
    bigRegistrationSub: {
      fontSize: '1.25rem',
      color: '#624100',
      lineHeight: 'normal',
      fontWeight: 'normal',
      '@media (max-width:376px)': {
        fontSize: '1.25rem',
      },
    },
    categorySubheader: {
      fontSize: '1.25rem',
      color: '#624100',
      lineHeight: '110%',
      fontWeight: 'bold',
      width: '80%',
      '@media (max-width:376px)': {
        fontSize: '1.25rem',
      },
    },

    loginHeader: {
      fontSize: '2rem',
      color: '#624100',
      width: '80%',
      lineHeight: '1.75rem',
      fontWeight: '900',
      '@media (max-width:376px)': {
        fontSize: '1.35rem',
      },
    },
    onboardingHeader: {
      fontSize: '1.4rem',
      color: '#624100',
      width: '80%',
      lineHeight: '1.75rem',
      fontWeight: '900',
      '@media (max-width:376px)': {
        fontSize: '1.35rem',
      },
    },

    onboardingHeader2: {
      fontSize: '1.4rem',
      color: '#000000',
      width: '80%',
      lineHeight: '1.75rem',
      fontWeight: '900',
      '@media (max-width:376px)': {
        fontSize: '1.35rem',
      },
    },

    onboardingSubheader: {
      fontSize: '1.05rem',
      color: '#624100',
      width: '80%',
      lineHeight: 'normal',
      fontWeight: 'normal',
      '@media (max-width:376px)': {
        fontSize: '1.01rem',
      },
    },

    onboardingSubheader2: {
      fontSize: '1.05rem',
      color: '#000000',
      width: '80%',
      lineHeight: 'normal',
      fontWeight: 'normal',
      '@media (max-width:376px)': {
        fontSize: '1.01rem',
      },
    },

    profileLogout: {
      fontSize: '1.15rem',
      color: '#730807',
      width: '80%',
      lineHeight: '1.25',
      '@media (max-width:376px)': {
        fontSize: '1.10rem',
      },

    },
    logo: {
      fontFamily: 'Josefin Sans'
    },

    button: {
      textTransform: 'none',
      fontWeight: '1000',
    }

  },
  shape: {
    borderRadius: 20,
  },

  components: {
    // Name of the component
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: '#E7DDC9',

        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: '#E7DDC9',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          boxShadow: 'none',
          height: '3.25rem',
          fontSize: '1.05rem'
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          height: '3.75rem',
          fontSize: '1.05rem'
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          background: '#FFD974'
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          color: '#49454F',
          py: '3rem',
          "&.Mui-selected": {
            "color": "black"
          },
        },

      },

    },

  },
});


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