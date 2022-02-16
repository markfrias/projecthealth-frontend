import { Button, Container } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



const LoginScreen = () => {
    return (
        <Container maxWidth="md" sx={{minHeight: "100vh", 
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column"}}>
            <div className='hero_container'>
  
       
            </div> 
            <div>
            <h1>Login and start health + fun.</h1>
            </div>
  
            
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '99%' },
      }}
      noValidate
      autoComplete="off"
    >
        <p>Email address</p>
      <TextField id="outlined-basic" label="Enter your email address" variant="outlined" />
      <p>Password</p>
      <TextField id="outlined-basic" label="Enter your strong password" variant="outlined" />

    </Box>
 
            
            <div className='button-group'>
            <Button className="button-loginScreen" variant="contained">Login</Button>
            </div>
            <div>
            <p>I don't have an account yet. Register for a new account.</p>
 
            </div>
        </Container>
            
            

        
    );
}

export default LoginScreen;