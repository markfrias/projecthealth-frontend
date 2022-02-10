import React, { useState } from "react";
import { Container, FormControl, Input, InputLabel, FormHelperText, Button } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import authService from "../auth/auth";

const Login = () => {
  const [loginForm, setLoginForm] = useState({emailAddress: "", passcode: ""});
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  // Form change handler
  const handleChange = (event) => {
    let target = event.target;
    setLoginForm({ ...loginForm, [target.name]: target.value });
  }

  const authenticationService = async () => {
    
    

    const response = await fetch("http://localhost:8000/api/users/login/", {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(loginForm),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    response.json()
    .then((data) => {
      if (data.status == "Success") {
        let localStorage = window.localStorage;
            localStorage.setItem('jwt', data.jwt);
            navigate('/home')
      } else {
        console.log("Fail")
      }
    })
    
  }

  return (
    // Render login screen when a user isn't authenticated, otherwise, navigate to home screen
    authService() ? <Navigate to="/home" /> :
  
      <div>
       <Container maxWidth="md" sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
         <h1>Login</h1>

        <FormControl sx={{mt: 2, mb: 2}}>
          <InputLabel htmlFor="emailAddress">Email address</InputLabel>
          <Input id="emailAddress" aria-describedby="emailHelperText" type="email" name="emailAddress" value={loginForm.emailAddress} onChange={handleChange}/>
          <FormHelperText id="emailHelperText">We'll never share your email.</FormHelperText>
        </FormControl>

        <FormControl sx={{mt: 2, mb: 2}}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input id="passcode" aria-describedby="passwordHelperText" type="password" name="passcode" value={loginForm.passcode} onChange={handleChange} />
        </FormControl>

        <Button onClick={authenticationService} >Login</Button>
       
       </Container>
      </div>

  );
};

export default Login;
