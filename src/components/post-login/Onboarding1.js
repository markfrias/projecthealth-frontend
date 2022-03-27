import { Alert, Button, Container, Typography, } from '@mui/material';
import { Switch } from '@mui/material';
import { Box } from '@mui/system';
import { getToken } from 'firebase/messaging';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { messaging } from '../firebase';

const Onboarding1 = () => {

  const navigate = useNavigate();
  const [notifIsAllowed, setNotifIsAllowed] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isSupported, setIsSupported] = useState(true);



  // Ask permission for notifications
  const askNotifPermission = () => {
    Notification.requestPermission().then((result) => {
      // Display error if denied
      if (result === "denied") {
        setNotifIsAllowed(false);
      } else if (result === "granted") {
        setNotifIsAllowed(true);

        // Get token
        getToken(messaging, { vapidKey: 'BH1QU2v_dSx50cCbq51BdAovW-yidS4pStShao_A1uxHKFVVPDsw2k3WlL89DDwCzj0O0opIW48rQ5CtxOYTwxY' }).then((currentToken) => {
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // ...
          } else {
            // Show permission request UI
            // ...
          }
        }).catch((err) => {
          // ...
        });
      }
    });
  }

  // Handle Switch changes
  const handleChange = (event) => {
    setIsChecked(!isChecked);
    setNotifIsAllowed(false);
  }

  // Use function to go somewhere
  const navigateConditionally = () => {
    if (isChecked) {
      navigate("/app/notification-setup")
    } else {
      navigate("/app/onboarding/2")

    }
  }

  // Check notification permission state on render once
  useEffect(() => {
    // Check current permission
    const checkCurrentNotifPermission = () => {
      if (Notification.permission === "denied") {
        setNotifIsAllowed(false);
      }
    }
    // Check if notifications are supported, if not, redirect to unsupported screen
    if (!("Notification" in window)) {
      setIsSupported(false);
    } else {
      checkCurrentNotifPermission();

    }
  }, []);


  return (
    !isSupported ? (<Navigate to="/app/notif-unsupported" />) :
      (<Container maxWidth="md" sx={{
        minHeight: "100vh",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column",
        p: '1em',
        pt: '2em'
      }}>

        <div>
          <Typography variant='onboardingHeader' component='h1' >Don't forget to log your meals</Typography>
        </div>

        <div className='hero_container'>
          <img alt="Alarm Clock" src={require("../../assets/img/alarm_clock.png")} />
        </div>

        <div>
          <Typography variant='subtitle1' component='p'>By turning on reminders, you'll be able to consistently track how you eat.</Typography>
        </div>

        {/* Display info message if notification permission is not asked yet*/}
        {notifIsAllowed === null ?
          <Alert severity="info">A browser popup will appear asking you permissions for notifications to be sent.</Alert>
          : <Box sx={{ display: "none" }} />
        }

        {/* Display error message if notification permission is denied*/}
        {notifIsAllowed === false ?
          <Alert severity="error">You have blocked notifications from our site. For instructions on turning on, <a style={{ fontWeight: 'bold', color: "black", textDecoration: "none" }} href="https://support.google.com/chrome/answer/3220216?hl=en&co=GENIE.Platform%3DAndroid&oco=1">tap</a> here.</Alert>
          : <Box sx={{ display: "none" }} />
        }

        {/* Display success message if notification permission is granted*/}
        {notifIsAllowed === true ?
          <Alert severity="success">Great! Notifications are now turned <strong>on</strong>.</Alert>
          : <Box sx={{ display: "none" }} />
        }



        <div className='switch_with_text'>
          <Typography variant='onboardingSubheader' component='p' >Enable meal reminders</Typography>

          {notifIsAllowed === false ?
            <Switch className='switch-onboarding1' onClick={askNotifPermission} onChange={handleChange} disabled checked={false} />
            :
            <Switch className='switch-onboarding1' onClick={askNotifPermission} onChange={handleChange} checked={isChecked} />
          }
        </div>


        <div>
          <Button className="button-onboarding" variant="contained" onClick={navigateConditionally}>Continue</Button>
        </div>
        {/*<ProgressMobileStepper></ProgressMobileStepper>*/}
      </Container>)






  );
}

export default Onboarding1;
