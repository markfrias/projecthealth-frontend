import React from 'react';
import { Container, Button } from '@mui/material';

const Registration1 = () => {
    return (

        <Container maxWidth="md" sx={"display: flex; flex-direction: column; justify-content: space-between; min-height: 100vh"}>

            <div className='header' style={{ marginTop: 180, mardignLeft: 10 }} >
                <h2 style={{ fontSize: 42 }}>Let's get to know each other.</h2>
                <p style={{ fontSize: 20 }} >We’d like to know your goals and conditions so that we can personalize the experience for you.</p>
            </div>
            <div className='button-group'>
                <Button className="button-full" variant="contained">Let's go!</Button>
            </div>
        </Container>

    );
}

export default Registration1;