import React from 'react';
import { Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Registration9 = () => {
    let navigate = useNavigate();
    const goNext = () => {
        navigate('/app/registration/10');
    }

    return (

        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100vh" }}>
            <div className="header" style={{ marginTop: 180, marginLeft: 5 }}>
                <h2 >Let’s create an account for you, now.</h2>
                <p>To enjoy the features of the app, you need to sign up for an account.</p>
            </div>
            <div className="button-class" style={{ marginLeft: 5, marginBottom: 250 }}>
                <Button className="button-full" variant="contained" onClick={goNext}>Register with your email</Button>
                {/* <Button className="button-full" variant="outlined" style={{ marginTop: 20 }}>Register with Google</Button> */}
                <p style={{ marginLeft: 20 }}>I already have an account. Login, instead.</p>
            </div>

        </Container>

    );
}

export default Registration9;
