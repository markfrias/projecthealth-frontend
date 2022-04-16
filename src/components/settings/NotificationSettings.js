import Button from '@mui/material/Button';
import { Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography, Box, CircularProgress, Alert } from '@mui/material';
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
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // State
    const [breakfastValue, setBreakfastValue] = useState(new Date('2018-01-01T00:00:00.000Z'));
    const [lunchValue, setLunchValue] = useState(new Date('2018-01-01T04:00:00.000Z'));
    const [dinnerValue, setDinnerValue] = useState(new Date('2018-01-01T11:00:00.000Z'));

    const navigate = useNavigate();


    // Handle closing modal
    const handleClose = () => {
        setOpen(false);
    }

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

        if (isChecked) {
            setOpen(true);
        } else {
            setIsChecked(!isChecked);
            setNotifIsAllowed(false);
        }

    }


    // Check notification permission state on render once
    useEffect(() => {

        (async () => {
            setLoading(true);
            // Set notification settings
            const settings = await getNotifSettings();
            const times = convertStringToTime(settings);
            setBreakfastValue(times[0]);
            setLunchValue(times[2]);
            setDinnerValue(times[1]);
            setLoading(false);
        })()


        // Check current permission
        const checkCurrentNotifPermission = () => {
            if (Notification.permission === "denied") {
                setNotifIsAllowed(false);
            }
            else if (Notification.permission === "granted") {
                setIsChecked(true);
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
        <Grid container direction="column" sx={{ minHeight: '100vh' }}>
            <Grid item xs={12} sx={{ background: '#F9AB10', p: '1em', mb: '1em' }}
                container direction='column'
            >
                <Button className='button-quicknote' variant='text' sx={{ color: 'black' }} startIcon={<KeyboardArrowLeftIcon />} component={Link} to="/app/profile">Back</Button>
                <Typography variant='onboardingHeader2' component='h1' >Notification settings</Typography>
            </Grid>


            <Container
                noValidate
                autoComplete="off"
                sx={{ height: '100%' }}
            >
                <Grid>

                    <Typography variant='subtitle1B' component='h2' sx={{ mb: '1em' }}>Notification on/off</Typography>
                    <Grid item container direction="row" justifyContent="space-between" sx={{ mb: '1.5em' }}>
                        <Typography variant='p' component='p' >Enable meal reminders</Typography>
                        {notifIsAllowed === false ?
                            <Switch className='switch-onboarding1' onClick={askNotifPermission} onChange={handleChange} disabled checked={false} />
                            :
                            <Switch className='switch-onboarding1' onClick={askNotifPermission} onChange={handleChange} checked={isChecked} />
                        }
                    </Grid>
                    {notifIsAllowed === false ?
                        <Grid item>
                            <Alert severity='info'> <a target="_blank" style={{ color: 'black' }} href="https://support.google.com/chrome/answer/3220216?hl=en&co=GENIE.Platform%3DAndroid">Learn how to enable notifications for this app by pressing here.</a></Alert>
                        </Grid>
                        :

                        loading ?
                            <Grid container direction="column" sx={{ height: '100%' }} alignItems="center" justifyContent="center">
                                <CircularProgress variant='indeterminate' sx={{ mb: '2em' }} />
                                <Typography variant="p">Loading content</Typography>
                            </Grid>

                            :

                            <Box>
                                <Grid>
                                    <Typography variant='subtitle1B' component='h2' sx={{ mb: '1em' }} >Notification time</Typography>
                                    <ThemedTimePicker value={breakfastValue} setValue={setBreakfastValue} label="Breakfast" />
                                </Grid>

                                <Grid>
                                    <ThemedTimePicker value={lunchValue} setValue={setLunchValue} label="Lunch" />
                                </Grid>

                                <Grid>
                                    <ThemedTimePicker value={dinnerValue} setValue={setDinnerValue} label="Dinner" />
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
                            </Box>

                    }








                </Grid>
            </Container>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Learn to block notifications
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You need to change this site's settings from your browser to block notifications.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button><a style={{ color: '#F9AB10', textDecoration: 'none' }} target="_blank" href="https://support.google.com/chrome/answer/3220216?hl=en&co=GENIE.Platform%3DAndroid">Learn more</a></Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>

        </Grid>



    );


};



export default NotificationSettings;