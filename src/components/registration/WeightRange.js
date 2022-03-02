import { Container, Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

const WeightRange = (props) => {
    const kgToLbs = (kg) => {
        return kg * 2.205;
    }

    // State for weight loss/gain range
    const [weightRange, setWeightRange] = useState(0.1);

    return (
        <Container sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
            <Box sx={{ mb: "5rem" }}>
                <Typography variant="onboardingHeader" component="h1" sx={{ mb: '1rem' }}>Set your pace for weight gain.</Typography>
                <Typography variant="onboardingSubheader" component="h2">You’ll be able to choose your pace for weight gain based on our <strong>recommended range</strong> for you.</Typography>

            </Box>

            <Box>
                <Slider
                    aria-label="WeightPace"
                    defaultValue={weightRange}
                    value={props.values.weightRange}
                    name="weightRange"
                    valueLabelDisplay="on"
                    step={0.1}
                    onChange={props.handleChange}
                    marks
                    min={0.1}
                    max={1}
                    valueLabelFormat={(value) => `${value} kg`}
                />

                <Typography variant="onboardingSubheader" component="p">You chose a weight loss pace of <strong>{props.values.weightRange} kg ({kgToLbs(props.values.weightRange).toFixed(2)} lbs) per week.</strong></Typography>

            </Box>






        </Container>
    );
}

export default WeightRange;
