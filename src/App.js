import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React, { useEffect, useState }/*, { useState }*/ from "react";
import "./App.css";
import { /*Link, */ BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
/*import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { AccountCircleRounded, BookRounded, HomeRounded, NoteRounded } from "@mui/icons-material";*/
import { Box } from "@mui/system";
import PrivateRoutes from './components/auth/PrivateRoutes';
import BottomNavFilter from './components/bottom-nav/BottomNavFilter';

import Journal from './components/journal/Journal';
import DateJournal from './components/journal/DateJournal';
import DateHabit from './components/journal/DateHabit';
import HabitScreen from './components/habits/HabitScreen';
import Profile from './components/profile/Profile';
import Food from './components/meal_recording/Food';
import WeightHeightMod from './components/settings/WeightHeightMod';
import NotificationSettings from './components/settings/NotificationSettings';
import LogScreen from './components/meal_recording/LogScreen';
import FoodQuickNote from './components/meal_recording/FoodQuickNote';
import Onboarding5 from './components/post-login/Onboarding5';
import Onboarding4 from './components/post-login/Onboarding4';
import Onboarding3 from './components/post-login/Onboarding3';
import Onboarding2 from './components/post-login/Onboarding2';
import Onboarding1 from './components/post-login/Onboarding1';
import FoodLogMainScreen from './components/meal_recording/FoodLogMainScreen';
import ProgressReport from './components/journal/ProgressReport';
import Accountsetting from './components/settings/Accountsetting';
import Habits from './components/registration/Habits';
import Notificationsetup from './components/post-login/NotificationSetup';
import NotificationUnsupported from './components/post-login/NotificationUnsupported';
import UnPrivateRoutes from './components/auth/UnPrivateRoutes';
import LoginScreen from './components/login/LoginScreen';
import Registration from './components/registration/Registration';
import Dashboard from './components/dashboard/Dashboard';
import { getMissions } from './components/auth/APIServices';

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
    fontFamily: '"Poppins" ,"Roboto", "Helvetica", "Arial", "Josefin Sans", sans-serif',
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

function App() {

  // PP and HP states
  const [hp, setHp] = useState(100);
  const [pp, setPp] = useState(10);
  const [ppBoundary, setPpBoundary] = useState(50)

  // Missions states
  const [missions, setMissions] = useState([]);
  const [missionsChecked, setMissionsChecked] = React.useState([]);

  // Account details states
  const [account, setAccount] = useState({
    firstName: 'Your account',
    emailAddress: 'All your settings are here'
  });

  // Set missions and user profile from database to global state
  useEffect(() => {
    (async () => {
      // On render get missions
      const newMissions = await getMissions();
      console.log(newMissions);

      setMissions(newMissions[0]);
      console.log(newMissions)

      // Set checkboxes
      const newChecked = [];
      newMissions[0].forEach((mission) => {
        if (mission.missionAccomplished === 1) {
          newChecked.push(mission.missionEntryId);
        }
      });
      setMissionsChecked(newChecked);
      console.log(newMissions[1][0])
      console.log(newMissions[1][0].progressPoints)
      console.log(newMissions[1][0].healthPoints)

      // Set HP and PP
      setHp(newMissions[1][0].healthPoints);
      setPp(newMissions[1][0].progressPoints);
      setPpBoundary(newMissions[1][0].levelBoundary);
      console.log(newMissions[1][0].levelBoundary)


      // Set account details
      setAccount(newMissions[1][0])
      console.log(newMissions[1][0])
    })()
  }, [])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>

          <Route element={<PrivateRoutes />} >
            <Route element={<BottomNavFilter />}>
              <Route path="/" element={<Dashboard ppBoundary={ppBoundary} setPpBoundary={setPpBoundary} hp={hp} pp={pp} setPp={setPp} setHp={setHp} missions={missions} checked={missionsChecked} setMissions={setMissions} setChecked={setMissionsChecked} account={account} setAccount={setAccount} />} />

            </Route>



            <Route path="/app">
              <Route element={<BottomNavFilter />}>
                <Route path="" element={<Dashboard ppBoundary={ppBoundary} setPpBoundary={setPpBoundary} hp={hp} pp={pp} setPp={setPp} setHp={setHp} missions={missions} checked={missionsChecked} setMissions={setMissions} setChecked={setMissionsChecked} account={account} setAccount={setAccount} />} />
                <Route path="journal/*" element={<Journal />} />
                <Route path="journal-log/:category/:year/:month/:day" element={<DateJournal />} />
                <Route path="datehabit/*" element={<DateHabit />} />
                <Route path="habitscreen" element={<HabitScreen />} />
                <Route path="profile" element={<Profile account={account} />} />


              </Route>
              <Route path="food/*" element={<Food />} />
              <Route path="settings/*" element={<WeightHeightMod />} />
              <Route path="notif-settings" element={<NotificationSettings />} />
              <Route path="logscreen/*" element={<LogScreen />} />
              <Route path="quicknote/*" element={<FoodQuickNote />} />
              <Route path="onboarding/5" element={<Onboarding5 />} />
              <Route path="onboarding/4" element={<Onboarding4 />} />
              <Route path="onboarding/3" element={<Onboarding3 />} />
              <Route path="onboarding/2" element={<Onboarding2 />} />
              <Route path="onboarding/1" element={<Onboarding1 />} />
              <Route path="foodlogmainscreen" element={<FoodLogMainScreen />} />
              <Route path="progress-report/*" element={<ProgressReport />} />

              <Route path="settings/account" element={<Accountsetting />} />

              <Route path="habits/*" element={<Habits />} />


              <Route path="notification-setup" element={<Notificationsetup />} />
              <Route path="notif-unsupported" element={<NotificationUnsupported />} />



            </Route>
          </Route>

          <Route element={<UnPrivateRoutes />} >
            <Route path="/app">
              <Route path="registration/*" element={<Registration />} />
            </Route>
          </Route>

          <Route path="/app/login" element={<LoginScreen />} />













        </Routes>
      </ThemeProvider>


    </BrowserRouter>

  );
}

export default App;
