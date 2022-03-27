import { Button, Container, Typography, Box } from '@mui/material';
import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';

const Onboarding5 = () => {
    return (
        <Container maxWidth="md" sx={{
            minHeight: "100vh",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
            pb: '1em'
        }}>


            <Box sx={{ width: "100%", height: "auto", display: 'flex', direction: 'column', justifyContent: 'center', px: '10%', pt: '3em' }}>
                <img alt="Bike" src={require("../../assets/img/dog-with-bike.png")} height="100%" width="100%" />


            </Box>
            <Box sx={{ textAlign: 'center', }}>
                <Typography variant="bigHeading" component="h1" pb=".5em" width="100%">Achieve missions and challenges</Typography>
                <Typography variant="bigHeadingSub" component="h2" width="100%">Accomplish missions and challenges to unlock items or characters.</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                <Button className="button-half" variant="contained" component={Link} to="/app/" endIcon={<ArrowForwardIosIcon />} >
                    Start now
                </Button>
            </Box>
        </Container>




    );
}

export default Onboarding5;
