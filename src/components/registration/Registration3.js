import React, { useEffect } from 'react';
import { Container, Button, Switch, Checkbox } from '@mui/material';
import { FormGroup, FormControlLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Registration4 from './Registration4';
import { useNavigate } from 'react-router-dom';




export default function Registration3(props) {
    const theme = useTheme();
    let navigate = useNavigate();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const goNext = () => {
        navigate('/app/registration/4');
    }


    return (


        < Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%", overflow: "scroll" }} >
            <div style={{ marginLeft: 10 }}>
                <h2>What are your health goals?.</h2>
                <p >We’d like to know your goals and conditions so that we can personalize the experience for you.</p>
            </div>

            <FormGroup style={{ marginLeft: 10 }}>
                <FormControlLabel control={<Checkbox name='eatHealthier' onChange={props.handleChange} checked={props.values.goals.eatHealthier} />} label="Eat Healthier" />
                <FormControlLabel control={<Checkbox name='increasePA' onChange={props.handleChange} checked={props.values.goals.increasePA} />} label="Increase Physical Activity" />
                <FormControlLabel control={<Checkbox name='improveSleep' onChange={props.handleChange} checked={props.values.goals.improveSleep} />} label="Improve Sleep" />
                <FormControlLabel control={<Checkbox name='reduceAC' onChange={props.handleChange} checked={props.values.goals.reduceAC} />} label="Reduce Alcohol Consumption" />
            </FormGroup>
        </Container >
    );
}