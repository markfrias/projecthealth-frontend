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
import Onboarding3 from "./components/post-login/Onboarding3"
import Onboarding4 from "./components/post-login/Onboarding4"
import Onboarding5 from "./components/post-login/Onboarding5";
import Onboarding6 from "./components/post-login/Onboarding6";
import Onboarding7 from "./components/post-login/Onboarding7"
import Onboarding8 from "./components/post-login/Onboarding8"
import Onboarding9 from "./components/post-login/Onboarding9"
import Onboarding10 from "./components/post-login/Onboarding10";
import Onboarding11 from "./components/post-login/Onboarding11"
import Onboarding12 from "./components/post-login/Onboarding12"
import HabitOnboarding1 from "./components/post-login/Habit-Onboarding/HabitOnboarding1";
import HabitOnboarding2 from "./components/post-login/Habit-Onboarding/HabitOnboarding2";
import HabitOnboarding3 from "./components/post-login/Habit-Onboarding/HabitOnboarding3";
import HabitOnboarding4 from "./components/post-login/Habit-Onboarding/HabitOnboarding4";
import HabitOnboarding5 from "./components/post-login/Habit-Onboarding/HabitOnboarding5";
import HabitScreen from "./components/post-login/HabitScreen/HabitScreen";





ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Landing />} />
          <Route path="/Onboarding" element={<Onboarding1 />} />
          <Route path="/Onboarding2" element={<Onboarding2 />} />
          <Route path="/Onboarding3" element={<Onboarding3 />} />
          <Route path="/Onboarding4" element={<Onboarding4 />} />
          <Route path="/Onboarding5" element={<Onboarding5 />} />
          <Route path="/Onboarding6" element={<Onboarding6 />} />
          <Route path="/Onboarding7" element={<Onboarding7 />} />
          <Route path="/Onboarding8" element={<Onboarding8 />} />
          <Route path="/Onboarding9" element={<Onboarding9 />} />
          <Route path="/Onboarding10" element={<Onboarding10 />} />
          <Route path="/Onboarding11" element={<Onboarding11 />} />
          <Route path="/Onboarding12" element={<Onboarding12 />} />
          <Route path="/HabitOnboarding1" element={<HabitOnboarding1 />} />
          <Route path="HabitOnboarding2" element={<HabitOnboarding2 />} />
          <Route path="HabitOnboarding3" element={<HabitOnboarding3 />} />
          <Route path="HabitOnboarding4" element={<HabitOnboarding4 />} />
          <Route path="HabitOnboarding5" element={<HabitOnboarding5 />} />
          <Route path="HabitScreen" element={<HabitScreen />} />


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
