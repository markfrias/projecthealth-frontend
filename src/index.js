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

// Firebase imports
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { getMessaging } from "firebase/messaging";
import Notificationsetup from './components/post-login/NotificationSetup';
import NotificationUnsupported from './components/post-login/NotificationUnsupported';
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


// Firebase config
/*const firebaseConfig = {
  apiKey: "AIzaSyD88HpnqsSRni91xOZOqvG_1nRDOErdoYg",
  authDomain: "healevate-c3688.firebaseapp.com",
  projectId: "healevate-c3688",
  storageBucket: "healevate-c3688.appspot.com",
  messagingSenderId: "798975874598",
  appId: "1:798975874598:web:c5814636dcd645312b38e7",
  measurementId: "G-7ZBZF5PN0V"
};*/


// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
//const messaging = getMessaging(app);

// Add the public key generated from the console here.
/*messaging.getToken({vapidKey: "BH1QU2v_dSx50cCbq51BdAovW-yidS4pStShao_A1uxHKFVVPDsw2k3WlL89DDwCzj0O0opIW48rQ5CtxOYTwxY"});*/



// Remove registration for now
/*
// Get registration token
getToken(messaging, { vapidKey: 'BH1QU2v_dSx50cCbq51BdAovW-yidS4pStShao_A1uxHKFVVPDsw2k3WlL89DDwCzj0O0opIW48rQ5CtxOYTwxY' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
    console.log(currentToken)
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});
*/




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