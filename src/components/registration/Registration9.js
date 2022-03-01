import React from 'react';
import { Container, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Registration9 = () => {
    let navigate = useNavigate();
    const goNext = () => {
        navigate('/app/registration/10');
    }

    return (

        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%" }}>
            <Box sx={{ textAlign: "center", mb: "6rem" }} className="header">
                <h2 >Let’s create an account for you, now.</h2>
                <p>To enjoy the features of the app, you need to sign up for an account.</p>
            </Box>
            <Box className="button-class" sx={{ textAlign: "center" }}>
                <Button className="button-full" variant="contained" onClick={goNext} sx={{ mb: "1rem" }}>Register with your email</Button>
                {/* <Button className="button-full" variant="outlined" style={{ marginTop: 20 }}>Register with Google</Button> */}
                <p>I already have an account. <u>Login,</u> instead.</p>
            </Box>

        </Container>

    );
}

export default Registration9;
