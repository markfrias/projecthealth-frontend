import { Container, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const ActivityLevel = (props) => {
    return (
        <Container sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", pt: '1em' }}>
            <Box sx={{ mb: "5rem" }}>
                <Typography variant="onboardingHeader" component="h1" sx={{ mb: '1rem' }}>How physically active are you?</Typography>
                <Typography variant="onboardingSubheader" component="h2">This information will only be used to personalize your experience.</Typography>
            </Box>

            <Box>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="activityLevel"
                        value={props.values.activityLevel}
                        onChange={props.handleChange}
                    >
                        <FormControlLabel value="sedentary" control={<Radio />} label="Sedentary" />
                        <FormControlLabel value="light" control={<Radio />} label="Light" />
                        <FormControlLabel value="moderate" control={<Radio />} label="Moderate" />
                        <FormControlLabel value="high" control={<Radio />} label="High" />
                    </RadioGroup>
                </FormControl>
            </Box>






        </Container>
    );
}

export default ActivityLevel;
