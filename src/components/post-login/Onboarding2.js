import { Button, Container } from '@mui/material';
import React from 'react';

const Onboarding2 = () => {
    return (
        <Container maxWidth="md" sx={{minHeight: "100vh", 
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column"}}>
            <div className='hero_container'>
                <img alt="Dog Sitting" src={require("../../assets/img/beagle-dog-sitting.png")} />          
            </div>
            <div>

            </div>
                <h1>Meet your gotchi, Pobi.</h1>
            <div>
            <p>Take care of your health, take care of your gotchi.</p>
 
            </div>
            <div className='button-group'>
            <Button className="button-onboarding" variant="contained">Continue</Button>
            </div>
        </Container>
            
            

        
    );
}

export default Onboarding2;
