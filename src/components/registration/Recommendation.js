import { Container, FormControl, FormControlLabel, Radio, RadioGroup, Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

const Recommendation = (props) => {
    const kgToLbs = (kg) => {
        return kg * 2.205;
    }

    return (
        <Container sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
            <Box sx={{ mb: "1rem" }}>
                <Typography variant="onboardingHeader" component="h1" sx={{ mb: '5rem' }}>Your plan is ready to go.</Typography>

            </Box>

            <Box>
                <Typography variant="onboardingSubheader" component="h2" sx={{ mb: "1rem" }}>You chose a weight gain pace of <strong> {props.values.weightRange} kg ({kgToLbs(props.values.weightRange).toFixed(2)} lbs) per week</strong>.</Typography>
                <Typography variant="onboardingSubheader" component="p">Your daily calorie budget will be <strong>1600 calories</strong>.</Typography>

            </Box>

        </Container>
    );
}

export default Recommendation;
