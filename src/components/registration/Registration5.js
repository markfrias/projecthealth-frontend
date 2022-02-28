import React from 'react';
import { Container, Button, TextField } from '@mui/material';
import { FormGroup, FormControlLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import { useNavigate } from 'react-router-dom';




export default function Registration5() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    let navigate = useNavigate();
    const goNext = () => {
        navigate('/app/registration/6');
    }


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (

        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100vh" }}>
            <div style={{ marginTop: 180, marginLeft: 5 }}>
                <h2>When were you born?</h2>
                <p  >This information will only be used to personalize your experience.</p>
            </div>
            <FormGroup style={{ marginBottom: 180 }}>

                <TextField id="outlined-basic" label="Please enter your birth date." variant="outlined" />

            </FormGroup>
            <div className='button-group'>
                <MobileStepper
                    variant="progress"
                    steps={6}
                    position="static"
                    activeStep={activeStep}
                    sx={{ maxWidth: 400, flexGrow: 1 }}
                />
                <Button className="button-full" variant="contained" onClick={goNext} >Continue</Button>
            </div>
        </Container>

    );
}
