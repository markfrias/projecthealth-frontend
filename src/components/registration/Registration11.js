import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Button } from '@mui/material';

export default function Registration11() {
    const [password, Confirm, setName] = React.useState();
    const handleChange = (event) => {
        setName(event.target.value);
    };

    return (
        <Container maxWidth="md" sx={"display: flex; flex-direction: column; justify-content: space-between; min-height: 60vh"}>
            <h2>Register your account</h2>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { marginLeft: 7, marginTop: 2, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="outlined-name"
                    label="Password"
                    value={password}
                    onChange={handleChange}
                />
                <TextField
                    id="outlined-name"
                    label="Confirm Password"
                    value={Confirm}
                    onChange={handleChange}
                />


            </Box>
            <div className='button-group'>
                <Button className="button-full" variant="contained">Register Now</Button>

            </div>
        </Container>
    );
}