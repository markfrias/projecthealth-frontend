import React from 'react';
import { Container, Checkbox } from '@mui/material';
import { FormGroup, FormControlLabel } from '@mui/material';

export default function Registration3(props) {
    return (


        < Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%", overflow: "scroll" }} >
            <div>
                <h2>What are your health goals?.</h2>
                <p >We’d like to know your goals and conditions so that we can personalize the experience for you.</p>
            </div>

            <FormGroup>
                <FormControlLabel control={<Checkbox name='eatHealthier' onChange={props.handleChange} checked={props.values.goals.eatHealthier} />} label="Eat Healthier" />
                <FormControlLabel control={<Checkbox name='increasePA' onChange={props.handleChange} checked={props.values.goals.increasePA} />} label="Increase Physical Activity" />
                <FormControlLabel control={<Checkbox name='improveSleep' onChange={props.handleChange} checked={props.values.goals.improveSleep} />} label="Improve Sleep" />
                <FormControlLabel control={<Checkbox name='reduceAC' onChange={props.handleChange} checked={props.values.goals.reduceAC} />} label="Reduce Alcohol Consumption" />
            </FormGroup>
        </Container >
    );
}