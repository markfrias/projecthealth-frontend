import { Button, Container } from '@mui/material';
import React from 'react';
import { Typography, Box } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';

const Onboarding4 = () => {
    return (
        <Container maxWidth="md" sx={{
            minHeight: "100vh",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
            pb: '1em',
            pt: '2em'
        }}>




            <Box sx={{ width: "100%", height: "auto", display: 'flex', direction: 'column', justifyContent: 'center', px: '10%', pt: '3em' }}>
                <img alt="Girl holding her dog" src={require("../../assets/img/girl-with-dog.png")} height="100%" width="100%" />

            </Box>
            <Box sx={{ textAlign: 'center', }}>
                <Typography variant="bigHeading" component="h1" pb=".5em" width="100%">Stick to healthy behavior</Typography>
                <Typography variant="bigHeadingSub" component="h2" width="100%">Create and choose habits. Whether it is exercising or sleeping longer.</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                <Button className="button-half" variant="contained" component={Link} to="/app/onboarding/5" endIcon={<ArrowForwardIosIcon />} >
                    Continue
                </Button>
            </Box>
        </Container>




    );
}

export default Onboarding4;
