import React from 'react';
import { Container, Box, FormControl, RadioGroup, Radio, Typography } from '@mui/material';
import { FormControlLabel } from '@mui/material';

export default function WeightGoals(props) {
    return (


        < Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%", overflow: "scroll", pt: '1em' }} >
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
                        <FormControlLabel value="loseWeight" control={<Radio />} label="Lose weight" sx={{ color: '#624100' }} />
                        <FormControlLabel value="gainWeight" control={<Radio />} label="Gain weight" sx={{ color: '#624100' }} />
                        <FormControlLabel value="maintainWeight" control={<Radio />} label="Maintain weight" sx={{ color: '#624100' }} />
                    </RadioGroup>
                </FormControl>
            </Box>
        </Container >
    );
}