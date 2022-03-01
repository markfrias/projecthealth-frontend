import React from 'react';
import { Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Registration1 = () => {
    let navigate = useNavigate();
    const goNext = () => {
        navigate('/app/registration/3');
    }
    return (

        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around", height: "100%" }}>

            <div >
                <h2 style={{ fontSize: 42 }}>Let's get to know each other.</h2>
                <p style={{ fontSize: 20 }} >We’d like to know your goals and conditions so that we can personalize the experience for you.</p>
            </div>
        </Container>

    );
}

export default Registration1;