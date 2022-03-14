import { Button, Container, Typography } from '@mui/material';
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
                <Typography variant='onboardingHeader' component='h1' >Meet you gotchi, Pobi</Typography>
            <div>
            <Typography variant='subtitle1' component='p'>Take care of your health, take care of your gotchi.</Typography>
 
            </div>
            <div className='button-group'>
            <Button className="button-onboarding" variant="contained">Continue</Button>
            </div>
        </Container>
            
            

        
    );
}

export default Onboarding2;
