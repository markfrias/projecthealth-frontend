import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap imports
/*import $ from 'jquery';
import Popper from 'popper.js';*/
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
//import Landing from "./components/landing/Landing";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Firebase imports
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { getMessaging } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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


getAnalytics();


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
    fontFamily: '"Poppins" ,"Roboto", "Helvetica", "Arial", sans-serif',
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
    },
    subtitle100B: {
      fontSize: '1.15rem',
      color: '#624100',
      width: '100%',
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

    button: {
      textTransform: 'none',
      fontWeight: '1000',
    },
    logo: {
      fontFamily: 'Josefin Sans'
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



ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App
      />
    </ThemeProvider>


  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();