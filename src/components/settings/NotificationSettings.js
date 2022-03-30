import Button from '@mui/material/Button';
import { Container, Grid, Typography } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Switch } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getToken } from 'firebase/messaging';
import { messaging } from '../firebase';
import ThemedTimePicker from '../ThemedTimePicker/ThemedTimePicker';
import { convertTimesToStrings } from '../post-login/timeConverter';
import { getNotifSettings, saveNotifSchedule } from '../auth/APIServices';
import { Link, useNavigate } from 'react-router-dom';
import { convertStringToTime } from './stringConverter';


const NotificationSettings = () => {
    const [notifIsAllowed, setNotifIsAllowed] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

    // State
    const [breakfastValue, setBreakfastValue] = useState(new Date('2018-01-01T00:00:00.000Z'));
    const [lunchValue, setLunchValue] = useState(new Date('2018-01-01T04:00:00.000Z'));
    const [dinnerValue, setDinnerValue] = useState(new Date('2018-01-01T11:00:00.000Z'));

    const navigate = useNavigate();


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


    // Check notification permission state on render once
    useEffect(() => {

        (async () => {
            // Set notification settings
            const settings = await getNotifSettings();
            const times = convertStringToTime(settings);
            setBreakfastValue(times[0]);
            setLunchValue(times[2]);
            setDinnerValue(times[1]);



        })()


        // Check current permission
        const checkCurrentNotifPermission = () => {
            if (Notification.permission === "denied") {
                setNotifIsAllowed(false);
            }
        }
        // Check if notifications are supported, if not, redirect to unsupported screen
        if (!("Notification" in window)) {
        } else {
            checkCurrentNotifPermission();

        }
    }, []);

    // Handle save button click
    const handleSaveButton = () => {
        // Put values in an array
        const localStorage = window.localStorage;
        const registrationToken = localStorage.getItem('jwt');
        const dates = [breakfastValue, lunchValue, dinnerValue];
        const newTime = convertTimesToStrings(dates);
        //setIsLoading(true);        // Send request to server
        saveNotifSchedule(newTime, registrationToken).then(data => {
            if (data === 200) {
                navigate('/app/');
            } else {
                //setIsLoading(false);
            }
        });
    }



  return (
    <Grid container spacing={4} >
      <Grid item xs={12} className='quicknote-container1'
        container direction='column'
      >
        <Button className='button-quicknote' variant='text' sx={{ color: 'black' }} startIcon={<KeyboardArrowLeftIcon />} component={Link} to="/app/profile">Back</Button>
        <Typography variant='onboardingHeader2' component='h1' >Notification settings</Typography>
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
                        <ThemedTimePicker value={breakfastValue} setValue={setBreakfastValue} label="Breakfast" />


                    </Grid>
                    <Grid>
                        <Typography variant='subtitle1' component='p' >Lunch</Typography>
                        <ThemedTimePicker value={lunchValue} setValue={setLunchValue} label="Breakfast" />

                    </Grid>
                    <Grid>
                        <Typography variant='subtitle1' component='p' >Dinner</Typography>
                        <ThemedTimePicker value={dinnerValue} setValue={setDinnerValue} label="Breakfast" />

                    </Grid>
                    <Grid>
                        <Button
                            className="button-loginScreen"
                            variant="contained"
                            onClick={handleSaveButton}

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