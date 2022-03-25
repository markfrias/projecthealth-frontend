import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import { Grid } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Onboarding2 = () => {
    return (
        <Container maxWidth="md" sx={{minHeight: "100vh", 
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column"}}>
            <div className='hero_container'>
                <img alt="Dog Sitting" src={require("../../assets/img/beagle-dog-sitting.png")} />          
            </div>
            <Grid Container spacing={4}>
                <Grid item xs={12}>
                <Typography variant='onboardingHeader' component='h1' >Meet you gotchi, Pobi</Typography>
                </Grid>

                <Grid item xs={12}>
                <Typography variant='subtitle1' component='p'>Take care of your health, take care of your gotchi.</Typography>
                </Grid>
            </Grid>
            
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <div className='button-group'>
                    <Button variant='text'>Skip intro</Button>
                        
                    </div>
                </Grid>

                <Grid item xs={6}>
                    <div className='button-group'>
                    <Button className="button-onboarding" variant="contained" endIcon={<ArrowForwardIosIcon />}>Continue</Button>
                    </div>
                </Grid>
            </Grid>
        </Container>
            
            

        
    );
}

export default Onboarding2;
