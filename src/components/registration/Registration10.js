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
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100vh" }}>
            <div className="header" style={{ marginTop: 80, marginLeft: 55 }}>
                <h2>Register your account</h2>
            </div>
            <Box

                component="form"
                sx={{
                    '& > :not(style)': { marginLeft: 5, marginTop: 2, width: '30ch' },
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

                />
                <TextField
                    id="outlined-name"
                    label="First name"
                    name="firstName"
                    type="text"
                    value={props.values.firstName}
                    onChange={props.handleChange}


                />
                <TextField
                    id="outlined-name"
                    label="Last name"
                    name="lastName"
                    type="text"
                    value={props.values.lastName}
                    onChange={props.handleChange}

                />

            </Box>
            <div className='button-group'>
                <Button className="button-full" variant="contained" onClick={goNext}>Continue</Button>

            </div>
        </Container>
    );
}