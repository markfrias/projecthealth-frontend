import React from 'react';
import { Container, Button } from '@mui/material';

const Registration9 = () => {
    return (

        <Container maxWidth="md" sx={"display: flex; flex-direction: column; justify-content: space-between; min-height: 60vh"}>

            <h2>Let’s create an account for you, now.</h2>
            <p>To enjoy the features of the app, you need to sign up for an account.</p>
            <Button className="button-full" variant="contained">Register with your email</Button>
            <Button className="button-full" variant="outlined">Register with Google</Button>
            <p>I already have an account. Login, instead.</p>
        </Container>

    );
}

export default Registration9;
