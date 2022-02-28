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


        < Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100vh" }} >
            <div style={{ marginTop: 180, marginLeft: 10 }}>
                <h2>What are your health goals?.</h2>
                <p >We’d like to know your goals and conditions so that we can personalize the experience for you.</p>
            </div>

            <FormGroup style={{ marginBottom: 120, marginLeft: 10 }}>
                <FormControlLabel control={<Checkbox name='eatHealthier' onChange={props.handleChange} checked={props.values.eatHealthier} />} label="Eat Healthier" />
                <FormControlLabel control={<Checkbox name='increasePA' onChange={props.handleChange} checked={props.values.increasePA} />} label="Increase Physical Activity" />
                <FormControlLabel control={<Checkbox name='improveSleep' onChange={props.handleChange} checked={props.values.improveSleep} />} label="Improve Sleep" />
                <FormControlLabel control={<Checkbox name='reduceAC' onChange={props.handleChange} checked={props.values.reduceAC} />} label="Reduce Alcohol Consumption" />
                <FormControlLabel control={<Checkbox name='loseWeight' onChange={props.handleChange} checked={props.values.loseWeight} />} label="Lose Weight" />
                <FormControlLabel control={<Checkbox name='gainWeight' onChange={props.handleChange} checked={props.values.gainWeight} />} label="Gain Weight" />
                <FormControlLabel control={<Checkbox name='maintainWeight' onChange={props.handleChange} checked={props.values.maintainWeight} />} label="Maintain Weight" />
            </FormGroup>
            <div className='button-group'>
                <MobileStepper
                    variant="progress"
                    steps={6}
                    position="static"
                    activeStep={activeStep}
                    sx={{ maxWidth: 400, flexGrow: 1 }}
                />
                <Button className="button-full" variant="contained" onClick={goNext}>Continue</Button>
            </div>
        </Container >
    );
}