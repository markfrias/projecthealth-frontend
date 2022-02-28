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
import Registration1 from './components/registration/Registration1';
import Registration2 from './components/registration/Registration2';
import Registration3 from './components/registration/Registration3';
import Registration4 from './components/registration/Registration4';
import Registration5 from './components/registration/Registration5';
import Registration6 from './components/registration/Registration6';
import Registration7 from './components/registration/Registration7';

// Firebase imports
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { getMessaging } from "firebase/messaging";
import Notificationsetup from './components/post-login/NotificationSetup';
import NotificationUnsupported from './components/post-login/NotificationUnsupported';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Registration8 from './components/registration/Registration8';
import Registration9 from './components/registration/Registration9';
import Registration10 from './components/registration/Registration10';
import Registration11 from './components/registration/Registration11';


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
            <Route path="registration-1" element={<Registration1 />} />
            <Route path="registration-2" element={<Registration2 />} />
            <Route path="registration-3" element={<Registration3 />} />
            <Route path="registration-4" element={<Registration4 />} />
            <Route path="registration-5" element={<Registration5 />} />
            <Route path="registration-6" element={<Registration6 />} />
            <Route path="registration-7" element={<Registration7 />} />
            <Route path="registration-8" element={<Registration8 />} />
            <Route path="registration-9" element={<Registration9 />} />
            <Route path="registration-10" element={<Registration10 />} />
            <Route path="registration-11" element={<Registration11 />} />

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