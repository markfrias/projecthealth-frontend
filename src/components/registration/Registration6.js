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


export default function Registration6(props) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    let navigate = useNavigate();
    const goNext = () => {
        navigate('/app/registration/7');
    }

    const [isMetric, setIsMetric] = useState(true);

    const handleMeasurementClick = () => {
        setIsMetric(!isMetric)
    }


    return (
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100vh" }}>
            <div style={{ marginTop: 180, marginLeft: 5 }}>
                <h2>How tall are you?</h2>
                <p>This information will only be used to personalize your experience.</p>
            </div>
            <FormControl style={{ marginBottom: 180 }}>
                <FilledInput
                    id="filled-adornment-weight"
                    name="height"
                    type="number"
                    value={props.values.height}
                    onChange={props.handleChange}
                    endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                    aria-describedby="filled-height-helper-text"
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                />
                <Stack direction="row" spacing={1} marginLeft={18} marginTop={3}>
                    <Chip label="cm" size="small" color={isMetric ? "primary" : "default"} clickable={true} onClick={handleMeasurementClick} variant={isMetric ? "filled" : "outlined"} />
                    <Chip label="ft. in" size="small" color={!isMetric ? "primary" : "default"} variant={isMetric ? "outlined" : "filled"} clickable={true} onClick={handleMeasurementClick} />
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