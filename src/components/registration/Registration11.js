import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Registration11() {
    const [password, Confirm, setName] = React.useState();
    const handleChange = (event) => {
        setName(event.target.value);
    };
    let navigate = useNavigate();
    const goNext = () => {
        navigate('/app/registration/success');
    }

    return (
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100vh" }}>

            <div className="header" style={{ marginTop: 80, marginLeft: 55 }}>
                <h2 >Register your account</h2>
                <p>Enter a strong password.</p>
            </div>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { marginLeft: 6, marginTop: 2, width: '28ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="outlined-name"
                    label="Password"

                />
                <TextField
                    id="outlined-name"
                    label="Confirm Password"
                />


            </Box>
            <div className='button-group'>
                <Button className="button-full" variant="contained" onClick={goNext}>Register Now</Button>

            </div>
        </Container>
    );
}