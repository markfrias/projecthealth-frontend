import { Button, CircularProgress, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import ThemedTimePicker from '../ThemedTimePicker/ThemedTimePicker';
import { convertTimesToStrings } from './timeConverter';
import { saveNotifSchedule } from '../auth/APIServices';
import { messaging } from '../firebase';
import { getToken } from 'firebase/messaging';
import { useNavigate } from 'react-router-dom';

const NotificationUnsupported = () => {

    const navigate = useNavigate();

    const [breakfastValue, setBreakfastValue] = React.useState(new Date('2018-01-01T00:00:00.000Z'));
    const [lunchValue, setLunchValue] = React.useState(new Date('Sat Feb 19 2022 12:00:00 GMT+0800 (Philippine Standard Time)'));
    const [dinnerValue, setDinnerValue] = React.useState(new Date('Sat Feb 19 2022 19:00:00 GMT+0800 (Philippine Standard Time)'));
    const [registrationToken, setRegistrationToken] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(null);

    // Convert time to string that can be sent to the server
    const handleSubmission = () => {
        navigate('/app/Onboarding2');

    }



    return (
        <div>
            <Container sx={{ paddingTop: "3em", minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='bigHeading' component="h1" sx={{ mb: '2.5rem' }}>Crossing our fingers</Typography>
                    <Container sx={{ height: '100%', width: '40%', mx: 0, mb: '2.5rem' }}>
                        <img alt=" 3D Alarm clock illustration" src={require('../../assets/img/alarm_clock.png')} height="100%" width="100%" />
                    </Container>

                    <Typography variant="subtitle1" component="h2" sx={{ mb: '0.75rem' }}>Your device or browser currently does not support notifications for the web.</Typography>
                    <Typography variant="subtitle1" component="h2" sx={{ mb: '3rem' }}><strong>But</strong> we’ll soon be offering an alternative to keep reminding you to log your meals.</Typography>

                </Box>


                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {isLoading ?
                        <Button variant='contained' disableElevation sx={{ minWidth: '50%' }}>

                            <CircularProgress color="secondary" />



                        </Button> :

                        <Button variant='contained' disableElevation sx={{ minWidth: '50%' }} onClick={handleSubmission}>

                            Continue
                            < NavigateNextRoundedIcon />



                        </Button>

                    }
                </Box>

            </Container>


        </div>
    );
}

export default NotificationUnsupported;
