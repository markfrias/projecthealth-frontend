import * as React from 'react';
import { Container, Chip, Button } from '@mui/material';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function Registration8(props) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    let navigate = useNavigate();
    const goNext = () => {
        navigate('/app/registration/9');
    }

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
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100vh" }}>
            <div style={{ marginTop: 180, marginLeft: 5 }}>
                <h2>What is your goal weight?</h2>
                <p>This information will only be used to personalize your experience.</p>
            </div>
            <FormControl style={{ marginBottom: 180 }}>
                <FilledInput
                    id="filled-adornment-weight"
                    name="goalWeight"
                    type="number"
                    value={isMetric ? metricMeasurement : lbsMeasurement}
                    onChange={handleFieldChange}
                    endAdornment={<InputAdornment position="end">{isMetric ? "kg" : "lbs"}</InputAdornment>}
                    aria-describedby="filled-height-helper-text"
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                />
                <Stack direction="row" spacing={1} marginLeft={18} marginTop={3}>
                    <Chip label="kg" size="small" color={isMetric ? "primary" : "default"} clickable={true} onClick={handleMeasurementClick} variant={isMetric ? "filled" : "outlined"} />
                    <Chip label="lbs" size="small" color={!isMetric ? "primary" : "default"} variant={isMetric ? "outlined" : "filled"} clickable={true} onClick={handleMeasurementClick} />
                </Stack>
            </FormControl>
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

        </Container>
    );
} 