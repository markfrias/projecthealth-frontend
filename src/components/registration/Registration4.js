import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Container, Button, Switch } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MobileStepper from '@mui/material/MobileStepper';
import { useNavigate } from 'react-router-dom';

export default function Registration4(props) {
    const [activeStep,] = React.useState(0);
    let navigate = useNavigate();
    const goNext = () => {
        navigate('/app/registration/5');
    }

    return (
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%" }}>
            <div>
                <h2>What is your sex?</h2>
                <p>This information will only be used to personalize your experience.</p>
            </div>
            <FormControl style={{ marginLeft: 25 }} >
                <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="sex"
                    value={props.values.sex}
                    onChange={props.handleChange}
                >
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Other" control={<Radio />} label="Other" />


                </RadioGroup>
            </FormControl>
        </Container>


    );
}