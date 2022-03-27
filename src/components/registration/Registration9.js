import React from 'react';
import { Container, Button, Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Registration9 = () => {
    let navigate = useNavigate();
    const goNext = () => {
        navigate('/app/registration/13');
    }

    return (

        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%", pt: '1em' }}>
            <Box sx={{ textAlign: "center", mb: "5rem" }} className="header">
                <Typography variant="onboardingHeader" component="h1" sx={{ mb: "1rem", width: '100%', px: '1em' }}>Let’s create an account for you, now.</Typography>
                <Typography variant="onboardingSubheader" component="h2" sx={{ mb: "5rem", width: '100%', px: '1em' }}>To enjoy the features of the app, you need to sign up for an account.</Typography>
            </Box>
            <Box className="button-class" sx={{ textAlign: "center" }}>
                <Button className="button-full" variant="contained" onClick={goNext} sx={{ mb: "2.5rem" }}>Register with your email</Button>
                {/* <Button className="button-full" variant="outlined" style={{ marginTop: 20 }}>Register with Google</Button> */}
                <Typography variant="onboardingSubheader" sx={{ width: '100%', px: '1em' }} component={Link} to="/app/login">I already have an account. <u>Login,</u> instead.</Typography>
            </Box>

        </Container>

    );
}

export default Registration9;
