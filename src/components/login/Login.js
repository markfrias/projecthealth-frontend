import React from "react";
import { Container, FormControl, Input, InputLabel, FormHelperText, Button } from "@mui/material";

const Login = () => {
  return (
  
      <div>
       <Container maxWidth="md" sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
         <h1>Login</h1>

        <FormControl sx={{mt: 2, mb: 2}}>
          <InputLabel htmlFor="emailAddress">Email address</InputLabel>
          <Input id="emailAddress" aria-describedby="emailHelperText" type="email" />
          <FormHelperText id="emailHelperText">We'll never share your email.</FormHelperText>
        </FormControl>

        <FormControl sx={{mt: 2, mb: 2}}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input id="password" aria-describedby="passwordHelperText" type="password" />
        </FormControl>

        <Button>Login</Button>
       
       </Container>
      </div>

  );
};

export default Login;
