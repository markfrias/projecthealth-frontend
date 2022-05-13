import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

import { useNavigate } from 'react-router-dom';

const Disclaimer = () => {

    const navigate = useNavigate();

    // Convert time to string that can be sent to the server
    const handleSubmission = () => {
        navigate('/app/onboarding/2');

    }



    return (
        <div>
            <Container sx={{ pt: "3em", minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pb: '1em' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='bigHeading' component="h1" sx={{ mb: '2.5rem' }}>Health disclaimer</Typography>
                    <Container sx={{ height: '100%', width: '40%', mx: 0, mb: '2.5rem' }}>
                        <img alt=" 3D Alarm clock illustration" src={require('../../assets/img/3d-flame-done.png')} height="100%" width="100%" />
                    </Container>

                    <Typography variant="subtitle1" component="h2" sx={{ mb: '0.75rem' }}>Before using the app, we advise you to <strong>consult</strong> first with your <strong>healthcare professional</strong> to assess whether it is appropriate for you to use this app.</Typography>
                    <Typography variant="subtitle1" component="h2" sx={{ mb: '3rem' }}>We <strong>discourage</strong> the use of this app if you have any medical condition that require a specialized diet plan (i.e., <strong>diabetes, hypertension</strong>)  as some of our recommendations might be inappropriate.</Typography>

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

export default Disclaimer;
