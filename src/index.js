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
//import Landing from "./components/landing/Landing";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PrivateRoutes from './components/auth/PrivateRoutes';
import Home from './components/home/Home';
import LoginScreen from './components/login/LoginScreen';
import Onboarding1 from './components/post-login/Onboarding1';
import Onboarding2 from './components/post-login/Onboarding2';
import Onboarding3 from './components/post-login/Onboarding3';
import Onboarding4 from './components/post-login/Onboarding4';
import Onboarding5 from './components/post-login/Onboarding5';
import Dashboard from './components/dashboard/Dashboard';
import FoodQuickNote from './components/meal_recording/FoodQuickNote';
import FoodLogMainScreen from './components/meal_recording/FoodLogMainScreen';
import LogScreen from './components/meal_recording/LogScreen';
import NotificationSettings from './components/settings/NotificationSettings';


// Firebase imports
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { getMessaging } from "firebase/messaging";
import Notificationsetup from './components/post-login/NotificationSetup';
import NotificationUnsupported from './components/post-login/NotificationUnsupported';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Registration from './components/registration/Registration';
import Habits from './components/registration/Habits';
import WeightHeightMod from './components/settings/WeightHeightMod';
import Food from './components/meal_recording/Food';
import Journal from './components/journal/Journal';



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
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/app" element={<App />}>
            <Route path="" element={<Dashboard />} />
            <Route path="food/*" element={<Food />} />
            <Route path="journal/*" element={<Journal />} />
            <Route path="settings/*" element={<WeightHeightMod />} />
            <Route path="notif-settings" element={<NotificationSettings />} />
            <Route path="logscreen/*" element={<LogScreen />} />
            <Route path="quicknote/*" element={<FoodQuickNote />} />
            <Route path="login/*" element={<LoginScreen />} />
            <Route path="Onboarding5/*" element={<Onboarding5 />} />
            <Route path="Onboarding4/*" element={<Onboarding4 />} />
            <Route path="Onboarding3/*" element={<Onboarding3 />} />
            <Route path="Onboarding2/*" element={<Onboarding2 />} />
            <Route path="Onboarding1/*" element={<Onboarding1 />} />
            <Route path="foodlogmainscreen/*" element={<FoodLogMainScreen />} />
            <Route path="registration/*" element={<Registration />}>

            </Route>

            <Route path="habits/*" element={<Habits />} />

            <Route path="Onboarding1" element={<Onboarding1 />} />
            <Route path="Onboarding2" element={<Onboarding2 />} />
            <Route path="Onboarding3" element={<Onboarding3 />} />
            <Route path="Onboarding4" element={<Onboarding4 />} />
            <Route path="Onboarding5" element={<Onboarding5 />} />
            <Route path="login" element={<LoginScreen />} />
            <Route path="notification-setup" element={<Notificationsetup />} />
            <Route path="notif-unsupported" element={<NotificationUnsupported />} />


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