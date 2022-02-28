import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Container, Button, Switch } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MobileStepper from '@mui/material/MobileStepper';
import { useNavigate } from 'react-router-dom';

export default function Registration4() {
    const [value, setValue] = React.useState('female');
    const [activeStep,] = React.useState(0);
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    let navigate = useNavigate();
    const goNext = () => {
        navigate('/app/registration/5');
    }

    return (
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100vh" }}>
            <div style={{ marginTop: 180, marginLeft: 25 }}>
                <h2>What is your sex?</h2>
                <p>This information will only be used to personalize your experience.</p>
            </div>
            <FormControl style={{ marginBottom: 200, marginLeft: 25 }} >
                <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="mother" control={<Radio />} label="Other" />


                </RadioGroup>
            </FormControl>
            <div className='button-group'>
                <MobileStepper
                    variant="progress"
                    steps={8}
                    position="static"
                    activeStep={activeStep}
                    sx={{ maxWidth: 400, flexGrow: 1 }}
                />
                <Button className="button-full" variant="contained" onClick={goNext}>Continue</Button>
            </div>
        </Container>


    );
}