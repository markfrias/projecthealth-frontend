import { Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';

const Onboarding2 = () => {
    return (
        <Container maxWidth="md" sx={{
            minHeight: "100vh",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
            pb: '1em'

        }}>
            <div className='hero_container'>
                <img alt="Dog Sitting" src={require("../../assets/img/beagle-dog-sitting.png")} />
            </div>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant='onboardingHeader' component='h1' >Meet you gotchi, Pobi</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='subtitle1' component='p'>Take care of your health, take care of your gotchi.</Typography>
                </Grid>
            </Grid>

            <Grid container spacing={4}>

                <Grid item container justifyContent="space-between">
                    <Button component={Link} to="/app/" sx={{ padding: '0', color: "black" }}>Skip intro</Button>
                    <Button variant="contained" component={Link} to="/app/onboarding/3" endIcon={<ArrowForwardIosIcon />}>Continue</Button>
                </Grid>
            </Grid>
        </Container>






    );
}

export default Onboarding2;
