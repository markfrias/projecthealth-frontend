import { Alert, Button, Container, Typography, } from '@mui/material';
import { Switch } from '@mui/material';
import { Box } from '@mui/system';
import { getToken } from 'firebase/messaging';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { messaging } from '../firebase';
/*import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';*/

/* function ProgressMobileStepper() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    return (
      <MobileStepper
        variant="progress"
        steps={6}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: 400, flexGrow: 1 }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    );
    }
    */
/*import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';*/


const Onboarding1 = () => {

  const navigate = useNavigate();
  const [notifIsAllowed, setNotifIsAllowed] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isSupported, setIsSupported] = useState(true);



  // Ask permission for notifications
  const askNotifPermission = () => {
    Notification.requestPermission().then((result) => {
      console.log(result);
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
        flexDirection: "column"
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
          <Alert severity="error">Notifications will not be turned on. For instructions on turning on, <strong>tap</strong> here.</Alert>
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


        <div className='button-group'>
          <Button className="button-onboarding" variant="contained" onClick={navigateConditionally}>Continue</Button>
        </div>
        {/*<ProgressMobileStepper></ProgressMobileStepper>*/}
      </Container>)






  );
}

export default Onboarding1;
