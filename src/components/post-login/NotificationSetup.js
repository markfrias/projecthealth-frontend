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

const Notificationsetup = () => {

    const navigate = useNavigate();

    const [breakfastValue, setBreakfastValue] = React.useState(new Date('2018-01-01T00:00:00.000Z'));
    const [lunchValue, setLunchValue] = React.useState(new Date('Sat Feb 19 2022 12:00:00 GMT+0800 (Philippine Standard Time)'));
    const [dinnerValue, setDinnerValue] = React.useState(new Date('Sat Feb 19 2022 19:00:00 GMT+0800 (Philippine Standard Time)'));
    const [registrationToken, setRegistrationToken] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(null);
    //const [isError, setIsError] = React.useState(false);





    // Convert time to string that can be sent to the server
    const handleSubmission = () => {
        // Array parameter should only accept array if this was a TypeScript project 🤡

        // Put values in an array
        const dates = [breakfastValue, lunchValue, dinnerValue];
        const newTime = convertTimesToStrings(dates);
        setIsLoading(true);        // Send request to server
        saveNotifSchedule(newTime, registrationToken).then(data => {
            if (data === 200) {
                navigate('/app/disclaimer')
            } else {
                setIsLoading(false);
            }
        });

    }


    useEffect(() => {
        // Get token
        getToken(messaging, { vapidKey: 'BH1QU2v_dSx50cCbq51BdAovW-yidS4pStShao_A1uxHKFVVPDsw2k3WlL89DDwCzj0O0opIW48rQ5CtxOYTwxY' }).then((currentToken) => {
            if (currentToken) {
                setRegistrationToken(currentToken);
            } else {
                // Show permission request UI
                //console.log('No registration token available. Request permission to generate one.');
                // ...
            }
        }).catch((err) => {
            //console.log('An error occurred while retrieving token. ', err);
            // ...
        });
    }, []);
    return (
        <div>
            <Container sx={{ paddingTop: "3em", minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='bigHeading' component="h1" sx={{ mb: '2.5rem' }}>Don't forget to log your meals</Typography>
                    <Container sx={{ height: '100%', width: '40%', mx: 0, mb: '2.5rem' }}>
                        <img alt=" 3D Alarm clock illustration" src={require('../../assets/img/alarm_clock.png')} height="100%" width="100%" />
                    </Container>

                    <Typography variant="subtitle1" component="h2" sx={{ mb: '0.75rem' }}><strong>When</strong> do you want to be reminded? </Typography>
                    <Typography variant="subtitle1" component="h2" sx={{ mb: '3rem' }}>For now, notifications can only be customized by <strong>hour</strong>.</Typography>


                    <ThemedTimePicker value={breakfastValue} setValue={setBreakfastValue} label="Breakfast" />
                    <ThemedTimePicker value={lunchValue} setValue={setLunchValue} label="Lunch" />
                    <ThemedTimePicker value={dinnerValue} setValue={setDinnerValue} label="Dinner" />

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

export default Notificationsetup;
