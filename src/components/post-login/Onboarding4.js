import { Button, Container } from '@mui/material';
import React from 'react';

const Onboarding4 = () => {
    return (
        <Container maxWidth="md" sx={{minHeight: "100vh", 
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column"}}>
            <div className='hero_container'>
                <img alt="Girl holding her dog" src={require("../../assets/img/girl-with-dog.png")} />          
            </div>
            <div>

            </div>
                <h1>Stick to healthy behavior</h1>
            <div>
            <p>Create and choose habits. Whether it is exercising or sleeping longer.</p>
 
            </div>
            <div className='button-group'>
            <Button className="button-onboarding" variant="contained">Continue</Button>
            </div>
        </Container>
            
            

        
    );
}

export default Onboarding4;
