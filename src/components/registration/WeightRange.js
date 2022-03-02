import { Container, Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const WeightRange = (props) => {
    const kgToLbs = (kg) => {
        return kg * 2.205;
    }

    // Change calorie recommendation everytime the weight loss/gain range changes
    useEffect(() => {
        // Calculate BMR
        const maleBMRVar = 5;
        const femaleBMRVar = -161
        let sexSpecificSolution = props.values.sex === "male" ? maleBMRVar : femaleBMRVar;
        console.log(props.values.sex)

        const bmr = (10 * props.values.weight) + (6.25 * props.values.height) - (5 * moment(new Date()).diff(new Date(props.values.birthday), "years")) + sexSpecificSolution;
        console.log(bmr);
        console.log((moment(new Date()).diff(new Date(props.values.birthday), 'years')))

    }, [props.values]);


    // State for weight loss/gain range
    const [weightRange, setWeightRange] = useState(0.1);

    // Conditionally render page based on weight goal of the user
    return (

        props.values.goals.weightGoal === "gainWeight" || props.values.goals.weightGoal === "loseWeight" ?
            <Container sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                <Box sx={{ mb: "5rem" }}>
                    <Typography variant="onboardingHeader" component="h1" sx={{ mb: '1rem' }}>Set your pace for {props.values.goals.weightGoal === "gainWeight" ? "weight gain" : "weight loss"}.</Typography>
                    <Typography variant="onboardingSubheader" component="h2" sx={{ mb: '0.5rem' }}>You’ll be able to choose your pace based on your preference.</Typography>
                    <Typography variant="onboardingSubheader" component="h2">We recommend you choose a <strong>slow</strong> and <strong>long term</strong> plan.</Typography>


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

                    <Typography variant="onboardingSubheader" component="p">You chose a {props.values.goals.weightGoal === "gainWeight" ? "weight gain" : "weight loss"} pace of <strong>{props.values.weightRange} kg ({kgToLbs(props.values.weightRange).toFixed(2)} lbs) per week.</strong></Typography>

                </Box>






            </Container> :
            <Navigate to="/app/registration/11" replace={true} />



    );
}

export default WeightRange;
