import { Button, Container } from '@mui/material';
import React from 'react';
import { Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
                <Typography variant='onboardingHeader' component='h1'>Stick to healthy behavior.</Typography>
            <div>
            <Typography variant='subtitle1' component='p'>Create and choose habits. Whether it is exercising or sleeping longer.</Typography>
 
            </div>
            <div className='button-group2'>
                    <Button className="button-onboarding" variant="contained" endIcon={<ArrowForwardIosIcon />}>Continue</Button>
                    </div>
        </Container>
            
            

        
    );
}

export default Onboarding4;
