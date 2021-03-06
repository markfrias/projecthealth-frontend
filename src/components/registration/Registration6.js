import * as React from 'react';
import { Container, Chip, Box, TextField, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import { useState } from 'react';


export default function Registration6(props) {
    const cmToFeet = (cm) => {
        return cm / 30.48;
    }

    const feetToCm = (feet) => {
        return feet * 30.48;
    }

    const [isMetric, setIsMetric] = useState(true);
    const [feetMeasurement, setFeetMeasurement] = useState(cmToFeet(props.values.height));
    const [metricMeasurement, setMetricMeasurement] = useState(props.values.height);

    const handleFieldChange = (event) => {
        const target = event.target;

        // If metric
        if (isMetric) {
            setMetricMeasurement(target.value);
            setFeetMeasurement(cmToFeet(target.value));
            props.handleChange(event)
        } else {
            setMetricMeasurement(feetToCm(target.value));
            setFeetMeasurement(target.value);
            target.value = feetToCm(target.value);
            props.handleChange(event);
        }

    }

    const handleMeasurementClick = () => {
        setIsMetric(!isMetric)
    }


    return (
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%", pt: '1em' }}>
            <Box sx={{ mb: "5rem" }}>
                <Typography variant="onboardingHeader" component="h1" sx={{ mb: "1rem" }}>How tall are you?</Typography>
                <Typography variant="onboardingSubheader" component="h2" sx={{ mb: "5rem" }}>This information will only be used to personalize your experience.</Typography>
            </Box>
            <FormControl>
                <TextField
                    sx={{ mb: ".5rem", minHeight: "auto" }}
                    variant="filled"
                    id="filled-adornment-weight"
                    name="height"
                    type="number"
                    helperText={props.isInvalid ? "Height must be filled out" : " "}
                    error={props.isInvalid}
                    onBlur={() => { props.setIsInvalid(metricMeasurement === "" ? true : false) }}
                    value={isMetric ? metricMeasurement : feetMeasurement}
                    onChange={handleFieldChange}
                    InputProps={{
                        endAdornment: < InputAdornment position="end" > {isMetric ? "cm" : "feet"}</InputAdornment>

                    }}
                    aria-describedby="filled-height-helper-text"
                    inputProps={{
                        'aria-label': 'weight',
                    }}

                />
                <Stack direction="row" spacing={1} justifyContent="center">
                    <Chip label="cm" size="small" color={isMetric ? "primary" : "default"} clickable={true} onClick={handleMeasurementClick} variant={isMetric ? "filled" : "outlined"} />
                    <Chip label="feet" size="small" color={!isMetric ? "primary" : "default"} variant={isMetric ? "outlined" : "filled"} clickable={true} onClick={handleMeasurementClick} />
                </Stack>
            </FormControl>
        </Container >

    );
} 