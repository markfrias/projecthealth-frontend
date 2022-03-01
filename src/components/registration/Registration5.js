import React from 'react';
import { Container, Button, TextField } from '@mui/material';
import { FormGroup, FormControlLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import { useNavigate } from 'react-router-dom';
import ThemedDatePicker from '../ThemedDatePicker/ThemedDatePicker';




export default function Registration5(props) {
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

        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%" }}>
            <div>
                <h2 >When were you born?</h2>
                <p className="mb-5" >This information will only be used to personalize your experience.</p>
            </div>
            <FormGroup >

                <ThemedDatePicker value={props.values.birthday} setValue={props.handleChange} label="Please enter your birth date" name="birthday" />

            </FormGroup>
        </Container>

    );
}
