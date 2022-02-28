import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Container, Button, Switch } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MobileStepper from '@mui/material/MobileStepper';

export default function Registration4() {
    const [value, setValue] = React.useState('female');
    const [activeStep,] = React.useState(0);
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (

        <Container maxWidth="md" sx={"display: flex; flex-direction: column; justify-content: space-between; min-height: 90vh"}>

            <h2>What is your sex?</h2>

            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">This information will only be used to personalize your experience.</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
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
                <Button className="button-full" variant="contained" >Continue</Button>
            </div>
        </Container>


    );
}