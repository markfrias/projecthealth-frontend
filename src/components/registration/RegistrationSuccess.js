import React from 'react';
import { Container, Typography } from '@mui/material';

export default function RegistrationSuccess() {
    return (

        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "100%" }}>

            <div>
                <Typography variant="bigRegistration" component="h1" mb="1.5rem">You're all set!</Typography>
                <Typography variant="bigRegistrationSub" >You can now proceed to login.</Typography>
            </div>
            <img alt="Success" src={require("../../assets/img/success.png")} />
        </Container>
    );
}