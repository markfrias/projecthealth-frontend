import React from 'react';
import ThemedDatePicker from '../ThemedDatePicker/ThemedDatePicker';
import { Container, FormGroup, Typography } from '@mui/material';




export default function Registration5(props) {
    return (
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%", pt: '1em' }}>
            <div>
                <Typography variant="onboardingHeader" component="h1" sx={{ mb: "1rem" }}>When were you born?</Typography>
                <Typography variant="onboardingSubheader" component="h2" sx={{ mb: "5rem" }}>This information will only be used to personalize your experience.</Typography>

            </div>
            <FormGroup >

                <ThemedDatePicker value={props.values.birthday} setValue={props.handleChange} label="Please enter your birth date" name="birthday" />

            </FormGroup>
        </Container>

    );
}
