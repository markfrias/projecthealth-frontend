import React from 'react';
import { Container, Button } from '@mui/material';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';



export default function Onboarding2() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (

        <Container maxWidth="md" sx={"display: flex; flex-direction: column; justify-content: space-between; min-height: 100vh"}>
            <div style={{ marginTop: 180, marginLeft: 10 }}>
                <h2>What are your health goals?.</h2>
                <p >We’d like to know your goals and conditions so that we can personalize the experience for you.</p>
            </div>


            <FormGroup style={{marginBottom: 120, marginLeft:10}}>

                <FormControlLabel control={<Checkbox />} label="Eat Healthier" />
                <FormControlLabel control={<Checkbox />} label="Increase Physical Activity" />
                <FormControlLabel control={<Checkbox />} label="Improve Sleep" />
                <FormControlLabel control={<Checkbox />} label="Reduce Alcohol Consumption" />
                <FormControlLabel control={<Checkbox />} label="Lose Weight" />
                <FormControlLabel control={<Checkbox />} label="Gain Weight" />
                <FormControlLabel control={<Checkbox />} label="Maintain Weight" />
            </FormGroup>



            <div className='button-group'>
                <MobileStepper
                    variant="progress"
                    steps={6}
                    position="static"
                    activeStep={activeStep}
                    sx={{ maxWidth: 400, flexGrow: 1 }}

                />
                <Button className="button-full" variant="contained">Continue</Button>
            </div>
        </Container>

    );
}

