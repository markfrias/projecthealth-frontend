import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Container, Box, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Registration4(props) {
    return (
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%", pt: '1em' }}>

            <Box>
                <Typography variant="onboardingHeader" component="h1" sx={{ mb: "1rem" }}>What is your sex?</Typography>
                <Typography variant="onboardingSubheader" component="h2" sx={{ mb: "5rem" }}>This information will only be used to personalize your experience.</Typography>
            </Box>

            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="sex"
                    value={props.values.sex}
                    onChange={props.handleChange}
                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" sx={{ color: '#624100' }} />
                    <FormControlLabel value="male" control={<Radio />} label="Male" sx={{ color: '#624100' }} />

                </RadioGroup>
            </FormControl>
        </Container>


    );
}