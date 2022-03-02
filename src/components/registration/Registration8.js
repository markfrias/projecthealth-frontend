import * as React from 'react';
import { Container, Chip, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { Box } from '@mui/system';


export default function Registration8(props) {
    const kgToLbs = (kg) => {
        return kg * 2.205;
    }

    const lbsToKg = (lbs) => {
        return lbs / 2.205;
    }
    const [isMetric, setIsMetric] = useState(true);
    const [lbsMeasurement, setLbsMeasurement] = useState(kgToLbs(props.values.goalWeight));
    const [metricMeasurement, setMetricMeasurement] = useState(props.values.goalWeight);

    const handleFieldChange = (event) => {
        const target = event.target;

        // If metric
        if (isMetric) {
            setMetricMeasurement(target.value);
            setLbsMeasurement(kgToLbs(target.value));
            props.handleChange(event)
        } else {
            setMetricMeasurement(lbsToKg(target.value));
            setLbsMeasurement(target.value);
            target.value = lbsToKg(target.value);
            props.handleChange(event);
        }

    }

    const handleMeasurementClick = () => {
        setIsMetric(!isMetric)
    }



    return (
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%" }}>
            <Box sx={{ mb: '5rem' }}>
                <h2>What is your goal weight?</h2>
                <p>This information will only be used to personalize your experience.</p>
            </Box>
            <FormControl>
                <TextField
                    sx={{ mb: '.5rem' }}
                    variant="filled"
                    id="filled-adornment-weight"
                    name="goalWeight"
                    type="number"
                    value={isMetric ? metricMeasurement : lbsMeasurement}
                    onChange={handleFieldChange}
                    aria-describedby="filled-height-helper-text"
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                    helperText={props.isInvalid ? "Weight must be filled out" : " "}
                    error={props.isInvalid}
                    onBlur={() => { props.setIsInvalid(metricMeasurement === "" ? true : false) }}
                    InputProps={
                        {
                            endAdornment: <InputAdornment position="end">{isMetric ? "kg" : "lbs"}</InputAdornment>

                        }
                    }
                />
                <Stack direction="row" spacing={1} marginLeft={18} marginTop={3}>
                    <Chip label="kg" size="small" color={isMetric ? "primary" : "default"} clickable={true} onClick={handleMeasurementClick} variant={isMetric ? "filled" : "outlined"} />
                    <Chip label="lbs" size="small" color={!isMetric ? "primary" : "default"} variant={isMetric ? "outlined" : "filled"} clickable={true} onClick={handleMeasurementClick} />
                </Stack>
            </FormControl>
        </Container>
    );
} 