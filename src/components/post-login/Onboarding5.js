import { Button, Container } from '@mui/material';
import React from 'react';

const Onboarding5 = () => {
    return (
        <Container maxWidth="md" sx={{minHeight: "100vh", 
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column"}}>
            <div className='hero_container'>
                <img alt="Bike" src={require("../../assets/img/dog-with-bike.png")} />
       
            </div>
            <div>

            </div>
                <h1>Achieve missions and challenges</h1>
            <div>
            <p>Accomplish missions and challenges to unlock items or characters.</p>
 
            </div>
            <div className='button-group'>
            <Button className="button-onboarding5" variant="contained">Start now</Button>
            </div>
        </Container>
            
            

        
    );
}

export default Onboarding5;
