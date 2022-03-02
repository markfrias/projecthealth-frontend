import React, { useEffect } from 'react';
import { Container, Button, Switch, Checkbox, Box, FormControl, RadioGroup, Radio, Typography } from '@mui/material';
import { FormGroup, FormControlLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Registration4 from './Registration4';
import { useNavigate } from 'react-router-dom';




export default function WeightGoals(props) {
    let navigate = useNavigate();

    return (


        < Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%", overflow: "scroll" }} >
            <Box>
                <Typography variant="onboardingHeader" component="h1" sx={{ mb: "1rem" }}>What are your health goals?</Typography>
                <Typography variant="onboardingSubheader" component="h2" sx={{ mb: "5rem" }}>We’d like to know your goals and conditions so that we can personalize the experience for you.</Typography>
            </Box>




            <Box>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="weightGoal"
                        value={props.values.goals.weightGoal}
                        onChange={props.handleChange}
                    >
                        <FormControlLabel value="loseWeight" control={<Radio />} label="Lose weight" />
                        <FormControlLabel value="gainWeight" control={<Radio />} label="Gain weight" />
                        <FormControlLabel value="maintainWeight" control={<Radio />} label="Maintain weight" />
                    </RadioGroup>
                </FormControl>
            </Box>
        </Container >
    );
}