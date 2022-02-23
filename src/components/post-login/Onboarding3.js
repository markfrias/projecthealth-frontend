import React from 'react';
import { Container, Button, Switch } from '@mui/material';
import { FormGroup, FormControlLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';



export default function Onboarding3() {
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
            <div style={{marginTop:150, marginLeft:10}}>
                <h2>Do you want to use calorie counting?</h2>
                <p >If you choose to enable calorie counting, you will be shown your calorie budget and what you have consumed.</p>
            </div>



            <FormGroup style={{marginBottom: 250, marginLeft: 10}}>
                
                <FormControlLabel control={<Switch />} label="Enable calorie counting" />


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

