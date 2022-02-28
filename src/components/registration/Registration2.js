import React from 'react';
import { Container, Button } from '@mui/material';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';



export default function Registration2() {
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

            <div className="header" style={{ marginTop: 180 }}>
                <h2 style={{ fontSize: 35 }} >You’re all set!</h2>
                <p style={{ fontSize: 20 }}>You can now proceed to login.</p>

            </div>
            <img alt="Success" src={require("../../assets/img/success.png")} />
            <div className='button-group'>
                <Button className="button-full" variant="contained">Login</Button>

            </div>

        </Container>
    );
}