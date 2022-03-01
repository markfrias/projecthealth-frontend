import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Registration10(props) {
    const [email, fname, lname, setName] = React.useState();
    const handleChange = (event) => {
        setName(event.target.value);
    };
    let navigate = useNavigate();
    const goNext = () => {
        navigate('/app/registration/11');
    }

    return (
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%" }}>
            <Box sx={{ textAlign: "center", mb: "5rem" }}>
                <h2>Register your account</h2>
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
                    sx={{ width: "100%", mb: "1rem" }}

                />
                <TextField
                    id="outlined-name"
                    label="First name"
                    name="firstName"
                    type="text"
                    value={props.values.firstName}
                    onChange={props.handleChange}
                    sx={{ width: "100%", mb: "1rem" }}



                />
                <TextField
                    id="outlined-name"
                    label="Last name"
                    name="lastName"
                    type="text"
                    value={props.values.lastName}
                    onChange={props.handleChange}
                    sx={{ width: "100%", mb: "1rem" }}


                />

            </Box>
        </Container>
    );
}