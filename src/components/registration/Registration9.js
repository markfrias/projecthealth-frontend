import React from 'react';
import { Container, Button } from '@mui/material';

const Registration9 = () => {
    return (

        <Container maxWidth="md" sx={"display: flex; flex-direction: column; justify-content: space-between; min-height: 100vh"}>
            <div className="header" style={{ marginTop: 180, marginLeft: 5 }}>
                <h2 >Let’s create an account for you, now.</h2>
                <p>To enjoy the features of the app, you need to sign up for an account.</p>
            </div>
            <div className="button-class" style={{ marginLeft: 5, marginBottom: 250 }}>
                <Button className="button-full" variant="contained">Register with your email</Button>
                <Button className="button-full" variant="outlined" style={{ marginTop: 20 }}>Register with Google</Button>
                <p style={{ marginLeft: 20 }}>I already have an account. Login, instead.</p>
            </div>

        </Container>

    );
}

export default Registration9;
