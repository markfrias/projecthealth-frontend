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

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Landing />} />
          <Route path="Onboarding1" element={<Onboarding1 />} />
          <Route path="Onboarding2" element={<Onboarding2 />} />
          <Route path="Onboarding3" element={<Onboarding3 />} />
          <Route path="Onboarding4" element={<Onboarding4 />} />
          <Route path="Onboarding5" element={<Onboarding5 />} />
        </Route>
      </Routes>
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
