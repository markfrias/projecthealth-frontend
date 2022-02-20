import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

import { useNavigate } from 'react-router-dom';

const NotificationUnsupported = () => {

    const navigate = useNavigate();

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
                    <Button variant='contained' disableElevation sx={{ minWidth: '50%' }} onClick={handleSubmission}>

                        Continue
                        < NavigateNextRoundedIcon />



                    </Button>
                </Box>

            </Container>


        </div>
    );
}

export default NotificationUnsupported;
