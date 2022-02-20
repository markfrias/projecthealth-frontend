import React from 'react';
import { Container, Button } from '@mui/material';

const Onboarding1 = () => {
    return (
       
        <Container maxWidth="md" sx={"display: flex; flex-direction: column; justify-content: space-between; min-height: 100vh"}>
           

            <div className='hero_container' >
            
            </div>
            
        
            <h2>Let's get to know each other.</h2>
            <p  >We’d like to know your goals and conditions so that we can personalize the experience for you.</p>

            <div className='button-group'>
            <Button className="button-full" variant="contained">Let's go!</Button>
            
            </div>
        </Container>
       
    );
}

export default Onboarding1;
