import { Button, Container } from '@mui/material';

import React from 'react';

const Onboarding3 = () => {
    return (
        <Container maxWidth="md" sx={{minHeight: "100vh", 
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column"}}>
            <div className='hero_container'>
                <img alt="Side view of Beagle dog" src={require("../../assets/img/healthy.png")} />
            </div>
                <div>
                <h1>Eat healthy.</h1>
                </div>
            <div>
            <p>Log healthy food to your journal to improve your gotchi’s health and happiness.</p>
 
            </div>
            <div className='button-group'>
            <Button className="button-onboarding" variant="contained">Continue</Button>
            </div>
        </Container>
            
            

        
    );
}

export default Onboarding3;