import React from "react";
import "./App.css";
import Login from "./components/login/Login";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
  },
  shape: {
    borderRadius: 20,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <button className="button-primary">Enter</button>
        <Login />
      </div>
    </ThemeProvider>
  );
}

export default App;
