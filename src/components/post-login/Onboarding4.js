import { Button, Container } from '@mui/material';
import React from 'react';
import { Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';

const Onboarding4 = () => {
    return (
        <Container maxWidth="md" sx={{
            minHeight: "100vh",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
            pb: '1em'
        }}>
            <div className='hero_container'>
                <img alt="Girl holding her dog" src={require("../../assets/img/girl-with-dog.png")} />
            </div>
            <div>

            </div>
            <Typography variant='onboardingHeader' component='h1'>Stick to healthy behavior.</Typography>
            <div>
                <Typography variant='subtitle1' component='p'>Create and choose habits. Whether it is exercising or sleeping longer.</Typography>

            </div>
            <div className='button-group'>
                <Button className="button-onboarding" variant="contained" component={Link} to="/app/onboarding/5" endIcon={<ArrowForwardIosIcon />}>Continue</Button>
            </div>
        </Container>




    );
}

export default Onboarding4;
