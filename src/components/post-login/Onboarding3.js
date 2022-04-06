import { Button, Container, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

const Onboarding3 = () => {
    return (
        <Container maxWidth="md" sx={{
            height: "100vh",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
            pb: '1em',
            pt: '2em'

        }}>



            <Box sx={{ width: "100%", height: "auto", display: 'flex', direction: 'column', justifyContent: 'center', px: '10%', pt: '3em' }}>
                <img alt="Side view of Beagle dog" src={require("../../assets/img/healthy.png")} height="100%" width="100%" />
            </Box>
            <Box sx={{ textAlign: 'center', }}>
                <Typography variant="bigHeading" component="h1" pb=".5em" width="100%">Eat healthy</Typography>
                <Typography variant="bigHeadingSub" component="h2" width="100%">Log healthy food to your journal to improve your gotchi’s health and happiness.</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                <Button className="button-half" variant="contained" component={Link} to="/app/onboarding/4" endIcon={<ArrowForwardIosIcon />} >
                    Continue
                </Button>
            </Box>
        </Container>




    );
}

export default Onboarding3;
