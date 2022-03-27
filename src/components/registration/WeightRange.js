import { Alert, Container, Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Navigate } from 'react-router-dom';

const WeightRange = (props) => {
    const kgToLbs = (kg) => {
        return kg * 2.205;
    }

    // Conditionally render page based on weight goal of the user
    return (

        props.values.goals.weightGoal === "gainWeight" || props.values.goals.weightGoal === "loseWeight" ?
            <Container sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", pt: '1em' }}>
                <Box sx={{ mb: "5rem" }}>
                    <Typography variant="onboardingHeader" component="h1" sx={{ mb: '1rem' }}>Set your pace for {props.values.goals.weightGoal === "gainWeight" ? "weight gain" : "weight loss"}.</Typography>
                    <Typography variant="onboardingSubheader" component="h2" sx={{ mb: '0.5rem' }}>You’ll be able to choose your pace based on your preference.</Typography>
                    <Typography variant="onboardingSubheader" component="h2">We recommend you choose a <strong>slow</strong> and <strong>long term</strong> plan.</Typography>


                </Box>

                <Box >
                    <Slider
                        aria-label="WeightPace"
                        defaultValue={0.1}
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

                    <Typography sx={{ mb: "5rem" }} variant="onboardingSubheader" component="p">You chose a {props.values.goals.weightGoal === "gainWeight" ? "weight gain" : "weight loss"} pace of <strong>{props.values.weightRange} kg ({kgToLbs(props.values.weightRange).toFixed(2)} lbs) per week.</strong></Typography>

                </Box>
                {
                    props.values.isWarning ?
                        <Alert severity="warning">This option is not recommended.</Alert> :
                        <Box></Box>
                }







            </Container> :
            <Navigate to="/app/registration/11" replace={true} />



    );
}

export default WeightRange;
