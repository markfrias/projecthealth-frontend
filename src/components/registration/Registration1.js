import React from 'react';
import { Container, Typography } from '@mui/material';

const Registration1 = () => {
    return (

        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around", height: "100%" }}>

            <div >
                <Typography variant="bigRegistration" component="h1" mb="1.5rem">Let's get to know each other.</Typography>
                <Typography variant="bigRegistrationSub" >We’d like to know your goals and conditions so that we can personalize the experience for you.</Typography>
            </div>
        </Container>

    );
}

export default Registration1;