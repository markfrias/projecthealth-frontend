import Button from '@mui/material/Button';
import { Container, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getToken } from 'firebase/messaging';
import { messaging } from '../firebase';


const NotificationSettings = () => {
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
    <Grid container spacing={4} >
      <Grid item xs={12} className='quicknote-container1'
        container direction='column'
      >
        <Button className='button-quicknote' variant='text' sx={{ color: 'black' }} startIcon={<KeyboardArrowLeftIcon />}>Back</Button>
        <Typography variant='onboardingHeader' component='h1' >Notification settings</Typography>
      </Grid>


      <Container
        sx={{
          '& > :not(style)': { m: 2, width: 300 },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid>

          <Typography variant='subtitle1B' component='h2'>Notification on/off</Typography>
          <div className='switch_with_text'>

            <Typography variant='subtitle1' component='p' >Enable meal reminders</Typography>
            {notifIsAllowed === false ?
              <Switch className='switch-onboarding1' onClick={askNotifPermission} onChange={handleChange} disabled checked={false} />
              :
              <Switch className='switch-onboarding1' onClick={askNotifPermission} onChange={handleChange} checked={isChecked} />
            }
          </div>
          <Grid>
            <Typography variant='subtitle1B' component='h2' >Notificiation time</Typography>
            <Typography variant='subtitle1' component='p' >Breakfast</Typography>
            <TextField
              label="08:00 am"
              variant="outlined"
              onChange={handleChange}
            />
          </Grid>
          <Grid>
            <Typography variant='subtitle1' component='p' >Lunch</Typography>
            <TextField
              label="12:00 pm"
              variant="outlined"
              onChange={handleChange}
            />
          </Grid>
          <Grid>
            <Typography variant='subtitle1' component='p' >Dinner</Typography>
            <TextField
              label="07:00 pm"
              variant="outlined"
              onChange={handleChange}
            />
          </Grid>
          <Grid>
            <Button
              className="button-loginScreen"
              variant="contained"

            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Container>

    </Grid>



  );


};



export default NotificationSettings;