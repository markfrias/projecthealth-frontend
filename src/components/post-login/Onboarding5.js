import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
                <Typography variant='onboardingHeader' component='h1'>Achieve missions and challenges.</Typography>
            <div>
            <Typography variant='subtitle1' component='p'>Accomplish missions and challenges to unlock items or characters.</Typography>
 
            </div>
            <div className='button-group3'>
            <Button className="button-onboarding5" variant="contained" endIcon={<ArrowForwardIosIcon />}>Start now</Button>
            </div>
        </Container>
            
            

        
    );
}

export default Onboarding5;
