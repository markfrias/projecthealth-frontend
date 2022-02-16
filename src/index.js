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
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Login from "./components/login/Login";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PrivateRoutes from './components/auth/PrivateRoutes';
import Home from './components/home/Home';
import LoginScreen from './components/login/LoginScreen';

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


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <Routes>
      
    <Route element={<PrivateRoutes />} >
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/" element={<App />}>
          <Route path="" element={<Landing />} />

          <Route path="Onboarding1" element={<Onboarding1 />} />
          <Route path="Onboarding2" element={<Onboarding2 />} />
          <Route path="Onboarding3" element={<Onboarding3 />} />
          <Route path="Onboarding4" element={<Onboarding4 />} />
          <Route path="Onboarding5" element={<Onboarding5 />} />
          <Route path="LoginScreen" element={<LoginScreen />} />

          <Route path="login" element={<Login />} />
        </Route>

      </Routes>
    </ThemeProvider>
    
      
    </BrowserRouter>
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
