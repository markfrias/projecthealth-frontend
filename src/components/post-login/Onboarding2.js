import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

const Onboarding2 = () => {
    return (
        <Container maxWidth="md" sx={{
            minHeight: "100vh",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
            pt: '2em',
            pb: '1em'

        }}>


            <Box sx={{ width: "100%", height: "auto", display: 'flex', direction: 'column', justifyContent: 'center', px: '10%' }}>
                <img alt="Dog Sitting" src={require("../../assets/img/beagle-dog-sitting.png")} height="100%" width="100%" />            </Box>
            <Box sx={{ textAlign: 'center', }}>
                <Typography variant="bigHeading" component="h1" pb=".5em" width="100%">Meet you gotchi, Pobi</Typography>
                <Typography variant="bigHeadingSub" component="h2" width="100%">Take care of your health, take care of your gotchi.</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <Button variant="text" component={Link} to="/app/" sx={{ color: 'black' }}>
                    Skip intro
                </Button>
                <Button className="button-half" variant="contained" component={Link} to="/app/onboarding/3" endIcon={<ArrowForwardIosIcon />} >
                    Continue
                </Button>
            </Box>
        </Container>








    );
}

export default Onboarding2;
