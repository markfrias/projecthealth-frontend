import React from 'react';
import { Container } from '@mui/material';

export default function RegistrationSuccess() {
    return (

        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "100%" }}>

            <div>
                <h2 style={{ fontSize: 35 }} >You’re all set!</h2>
                <p style={{ fontSize: 20 }}>You can now proceed to login.</p>

            </div>
            <img alt="Success" src={require("../../assets/img/success.png")} />
        </Container>
    );
}