import { Button, Container, MobileStepper } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Registration1 from './Registration1';
import Registration10 from './Registration10';
import Registration11 from './Registration11';
import Registration3 from './Registration3';
import Registration4 from './Registration4';
import Registration5 from './Registration5';
import Registration6 from './Registration6';
import Registration7 from './Registration7';
import Registration8 from './Registration8';
import Registration9 from './Registration9';
import RegistrationSuccess from './RegistrationSuccess';

const Registration = () => {
    const initialState = {
        goals: {
            eatHealthier: false,
            increasePA: false,
            improveSleep: false,
            reduceAC: false,
            loseWeight: false,
            gainWeight: false,
            maintainWeight: false
        },
        sex: "",
        birthday: new Date(),
        height: "",
        weight: "",
        goalWeight: "",
        emailAddress: "",
        firstName: "",
        lastName: "",
        password1: "",
        password2: "",


    }

    const [step, setStep] = useState(1);
    let location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        console.log(location.pathname.slice(18));
        console.log(parseInt(location.pathname.slice(18)))
        const stepBasis = parseInt(location.pathname.slice(18))
        setStep(stepBasis - 2);

    }, [location]);

    // Registration state
    const [regState, setRegState] = useState(initialState);

    // Goal checkboxes handler
    const handleCheckboxes = (event) => {
        const target = event.target;
        setRegState({
            ...regState,
            goals: {
                ...regState.goals,
                [target.name]: target.checked
            }

        }
        )
    };

    // General change handler
    const handleChanges = (event) => {
        const target = event.target;
        setRegState({
            ...regState,
            [target.name]: target.value
        })
    }

    // Date change handler
    const handleDateChanges = (data) => {
        setRegState({
            ...regState,
            birthday: data
        })
    }

    // Continue button handler
    const goNext = () => {
        const stepBasis = "/app/registration/"

        // Check if the last part of the address is a number or if it is one
        if (location.pathname.slice(18) === "" || parseInt(location.pathname.slice(18)) === 1) {
            navigate(stepBasis + 3);
        } else {
            const stepNumber = parseInt(location.pathname.slice(18));
            navigate(stepBasis + (stepNumber + 1));
        }

    }

    // Register now button handler 
    const handleRegistration = () => {
        navigate(location.pathname.slice(0, 18) + "success")
    }

    // Login button handler 
    const handleLogin = () => {
        navigate("/");
    }


    //Test states
    useEffect(() => {
        console.log(regState.goalWeight)
    }, [regState]);


    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", paddingTop: "1rem" }}>
            <Routes>
                <Route path="/" element={<Registration1 />} />
                <Route path="1" element={<Registration1 />} />
                <Route path="3" element={<Registration3 handleChange={handleCheckboxes} values={regState} />} />
                <Route path="4" element={<Registration4 handleChange={handleChanges} values={regState} />} />
                <Route path="5" element={<Registration5 handleChange={handleDateChanges} values={regState} />} />
                <Route path="6" element={<Registration6 handleChange={handleChanges} setState={setRegState} values={regState} />} />
                <Route path="7" element={<Registration7 handleChange={handleChanges} setState={setRegState} values={regState} />} />
                <Route path="8" element={<Registration8 handleChange={handleChanges} setState={setRegState} values={regState} />} />
                <Route path="9" element={<Registration9 />} />
                <Route path="10" element={<Registration10 handleChange={handleChanges} values={regState} />} />
                <Route path="11" element={<Registration11 handleChange={handleChanges} values={regState} />} />
                <Route path="success" element={<RegistrationSuccess />} />
            </Routes>

            {parseInt(location.pathname.slice(18)) >= 3 && parseInt(location.pathname.slice(18)) <= 8 ?
                <Container sx={{ paddingBottom: "1rem" }}>
                    <MobileStepper steps={7} LinearProgressProps={{ sx: { width: '100%' } }} activeStep={step} variant="progress" position='static' sx={{ backgroundColor: "rgba(0,0,0, 0)", width: "100%", justifyContent: "center" }} />
                    <Button className="button-full" variant="contained" onClick={goNext}>Continue</Button>
                </Container>
                : <Box> </Box>
            }

            {parseInt(location.pathname.slice(18)) >= 10 && parseInt(location.pathname.slice(18)) <= 11 ?
                <Container sx={{ paddingBottom: "1rem" }}>
                    <MobileStepper steps={2} LinearProgressProps={{ sx: { width: '100%' } }} activeStep={step - 8} variant="progress" position='static' sx={{ backgroundColor: "rgba(0,0,0, 0)", width: "100%", justifyContent: "center" }} />
                    {parseInt(location.pathname.slice(18)) === 11 ?
                        <Button className="button-full" variant="contained" onClick={handleRegistration}>Register now</Button>
                        : <Button className="button-full" variant="contained" onClick={goNext}>Continue</Button>
                    }
                </Container>
                : <Box> </Box>
            }

            {location.pathname.slice(18) === "success" ?
                <Container sx={{ paddingBottom: "1rem" }}>
                    <Button className="button-full" variant="contained" onClick={handleLogin}>Login</Button>
                </Container>
                : <Box> </Box>
            }

            {location.pathname.slice(18) === "" || parseInt(location.pathname.slice(18)) === 1 ?
                <Container sx={{ paddingBottom: "1rem" }}>
                    <Button className="button-full" variant="contained" onClick={goNext}>Let's go!</Button>
                </Container>
                : <Box> </Box>
            }



        </Box>

    );
}

export default Registration;
