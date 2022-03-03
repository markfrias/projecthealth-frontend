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
import Onboarding1 from "./components/post-login/Onboarding1";
import Onboarding2 from "./components/post-login/Onboarding2";
import Onboarding3 from "./components/post-login/Onboarding3";
import Onboarding4 from "./components/post-login/Onboarding4";
import Onboarding5 from "./components/post-login/Onboarding5";
import Login from "./components/login/Login";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PrivateRoutes from './components/auth/PrivateRoutes';
import Home from './components/home/Home';
import LoginScreen from './components/login/LoginScreen';
import Dashboard from './components/dashboard/Dashboard';
import FoodQuickNote from './components/meal_recording/FoodQuickNote';
import FoodLogScreen from './components/meal_recording/FoodLogScreen';
import FoodLogMainScreen from './components/meal_recording/FoodLogMainScreen';
import LogScreen from './components/meal_recording/LogScreen';

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
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="quicknote" element={<FoodQuickNote />} />
          <Route path="foodlog" element={<FoodLogScreen />} />
          <Route path="foodlogmainscreen" element={<FoodLogMainScreen />} />
          <Route path="logscreen" element={<LogScreen />} />

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
