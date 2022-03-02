import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

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
                {props.values.goals.weightGoal !== "maintainWeight" ?
                    <Typography variant="onboardingSubheader" component="h2" sx={{ mb: "1rem" }}>You chose a weight gain pace of <strong> {props.values.weightRange.toFixed(2)} kg ({kgToLbs(props.values.weightRange).toFixed(2)} lbs) per week</strong>.</Typography>
                    :
                    <Typography variant="onboardingSubheader" component="h2" sx={{ mb: "1rem" }}>You chose to maintain your current weight.</Typography>
                }

                <Typography variant="onboardingSubheader" component="p">Your daily calorie budget will be <strong>{props.values.calorieBudget.toFixed(0)} calories</strong>.</Typography>

            </Box>

        </Container>
    );
}

export default Recommendation;
