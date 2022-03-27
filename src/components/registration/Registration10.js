import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Typography } from '@mui/material';

export default function Registration10(props) {
    return (
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%", pt: '1em' }}>
            <Box sx={{ textAlign: "center", mb: "5rem" }}>
                <Typography variant="onboardingHeader" component="h1" sx={{ mb: "1rem", width: '100%', px: '1em' }}>Register your account</Typography>
            </Box>
            <Box
                sx={{
                    width: "100%"
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="outlined-name"
                    label="Email address"
                    name="emailAddress"
                    type="email"
                    value={props.values.emailAddress}
                    onChange={props.handleChange}
                    sx={{ width: "100%", mb: "1.5rem" }}

                />
                <TextField
                    id="outlined-name"
                    label="First name"
                    name="firstName"
                    type="text"
                    value={props.values.firstName}
                    onChange={props.handleChange}
                    sx={{ width: "100%", mb: "1.5rem" }}



                />
                <TextField
                    id="outlined-name"
                    label="Last name"
                    name="lastName"
                    type="text"
                    value={props.values.lastName}
                    onChange={props.handleChange}
                    sx={{ width: "100%", mb: "1.5rem" }}


                />

            </Box>
        </Container>
    );
}