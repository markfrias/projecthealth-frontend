import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Button } from '@mui/material';

export default function Onboarding10() {
  const [email, fname, lname, setName] = React.useState();
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Container maxWidth="md" sx={"display: flex; flex-direction: column; justify-content: space-between; min-height: 100vh"}>

      <div className="header" style={{ marginTop: 80, marginLeft: 55}}>
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
          label="Email"
          value={email}
          onChange={handleChange}
        />
        <TextField
          id="outlined-name"
          label="First Name"
          value={fname}
          onChange={handleChange}
        />
        <TextField
          id="outlined-name"
          label="Last Name"
          value={lname}
          onChange={handleChange}
        />

      </Box>
      <div className='button-group'>
        <Button className="button-full" variant="contained">Continue</Button>

      </div>
    </Container>
  );
}
