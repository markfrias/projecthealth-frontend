import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { nodeName } from "jquery";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#F9AB10",
    },
    secondary: {
      main: "#d3f76c",
    },
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
    subtitle1: {
      fontSize: '1.15rem',
      color: '#624100',
      width: '80%',
      lineHeight: 'normal',
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
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
