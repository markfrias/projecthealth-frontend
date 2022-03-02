import React from 'react';
import { useTheme } from '@mui/material/styles';
import ThemedDatePicker from '../ThemedDatePicker/ThemedDatePicker';
import { Container, FormGroup } from '@mui/material';




export default function Registration5(props) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

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
