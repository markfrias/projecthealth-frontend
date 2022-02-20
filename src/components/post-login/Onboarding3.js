import React from 'react';
import { Container, Button, Switch } from '@mui/material';
import { FormGroup, FormControlLabel} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Onboarding4 from './Onboarding4';



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

        <Container maxWidth="md" sx={"display: flex; flex-direction: column; justify-content: space-between; min-height: 90vh"}>



            <h2>Do you want to use calorie counting?</h2>


            <FormGroup>
                <p  >If you choose to enable calorie counting, you will be shown your calorie budget and what you have consumed.</p>
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
                <Button className="button-full" variant="contained"  component={Onboarding4} to="/Onboarding4">Continue</Button>
            </div>
        </Container>

    );
}

