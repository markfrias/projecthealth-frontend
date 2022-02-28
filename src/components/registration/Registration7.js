import * as React from 'react';
import { Container, Chip, Button } from '@mui/material';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Stack from '@mui/material/Stack';


export default function Registration7() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleClick = () => {
    };
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <Container maxWidth="md" sx={"display: flex; flex-direction: column; justify-content: space-between; min-height: 90vh"}>
            <h2>How much do you weight?</h2>
            <p>This information will only be used to personalize your experience.</p>

            <FormControl>
                <FilledInput
                    id="filled-adornment-weight"
                    value={values.weight}
                    onChange={handleChange('height')}
                    endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                    aria-describedby="filled-height-helper-text"
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                />
                <Stack direction="row" spacing={1} marginLeft={18} marginTop={3}>
                    <Chip label="kg" size="small" />
                    <Chip label="lbs" size="small" variant="outlined" />
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
                <Button className="button-full" variant="contained"  >Continue</Button>
            </div>

        </Container>
    );
} 