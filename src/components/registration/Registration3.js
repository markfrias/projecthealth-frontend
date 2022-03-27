import React from 'react';
import { Container, Checkbox, Typography, Box } from '@mui/material';
import { FormGroup, FormControlLabel } from '@mui/material';

export default function Registration3(props) {
    return (


        < Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%", overflow: "scroll", pt: '1em' }} >
            <Box>
                <Typography variant="onboardingHeader" component="h1" sx={{ mb: "1rem" }}>What are your health goals?</Typography>
                <Typography variant="onboardingSubheader" component="h2" sx={{ mb: "5rem" }}>We’d like to know your goals and conditions so that we can personalize the experience for you.</Typography>
            </Box>


            <FormGroup>
                <FormControlLabel control={<Checkbox name='eatHealthier' onChange={props.handleChange} checked={props.values.goals.eatHealthier} />} label="Eat healthier" sx={{ color: '#624100' }} />
                <FormControlLabel control={<Checkbox name='increasePA' onChange={props.handleChange} checked={props.values.goals.increasePA} />} label="Increase physical activity" sx={{ color: '#624100' }} />
                <FormControlLabel control={<Checkbox name='improveSleep' onChange={props.handleChange} checked={props.values.goals.improveSleep} />} label="Improve sleep" sx={{ color: '#624100' }} />
                <FormControlLabel control={<Checkbox name='reduceAC' onChange={props.handleChange} checked={props.values.goals.reduceAC} />} label="Reduce alcohol consumption" sx={{ color: '#624100' }} />
            </FormGroup>
        </Container >
    );
}