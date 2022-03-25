import { Button, Container, Typography, Grid } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
                <Grid item xs={12}>
                <Typography variant='onboardingHeader' component='h1'>Eat healthy.</Typography>
                <Typography variant='subtitle1' component='p'>Log healthy food to your journal to improve your gotchi’s health and happiness.</Typography>
                </Grid>
        
            
 
        
                <div className='button-group2'>
                    <Button className="button-onboarding" variant="contained" endIcon={<ArrowForwardIosIcon />}>Continue</Button>
                    </div>
        </Container>
            
            

        
    );
}

export default Onboarding3;
