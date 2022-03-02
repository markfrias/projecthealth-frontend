import { Button, Container, MobileStepper } from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ActivityLevel from './ActivityLevel';
import Recommendation from './Recommendation';
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
import WeightGoals from './WeightGoals';
import WeightRange from './WeightRange';
import { registerAccount } from '../auth/APIServices';

const Registration = () => {
    const initialState = {
        goals: {
            weightGoal: "maintainWeight",
            eatHealthier: false,
            increasePA: false,
            improveSleep: false,
            reduceAC: false,
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
        activityLevel: "",
        weightRange: 0.1,
        isWarning: false,
        calorieBudget: 0
    }

    const [step, setStep] = useState(1);
    let location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        if (location.pathname.slice(18) === "") {
            return;
        }

        const stepBasis = parseInt(location.pathname.slice(18))

        if (stepBasis >= 13 && stepBasis <= 14) {
            console.log(stepBasis - 12)
            setStep(stepBasis - 12);
            return;
        }
        setStep(stepBasis - 2);

    }, [location]);

    // Registration state
    const [regState, setRegState] = useState(initialState);

    // Modal states
    const [open, setOpen] = useState(false);
    const [dialogHead, setDialogHead] = useState("");
    const [dialogBody, setDialogBody] = useState("");



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

    // Weight goal change handler
    const handleWeightGoal = (event) => {
        const target = event.target;
        setRegState({
            ...regState,
            goals: {
                ...regState.goals,
                weightGoal: target.value
            }
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
            navigate(stepBasis + 2);
        } else {
            const stepNumber = parseInt(location.pathname.slice(18));
            navigate(stepBasis + (stepNumber + 1));
        }

    }

    // Register now button handler 
    const handleRegistration = async () => {
        if (regState.password1 !== regState.password2) {
            setDialogHead("Incomplete information")
            setDialogBody("The passwords you entered did not match.")
            setOpen(true)
            return;
        }
        const res = await registerAccount(regState);
        if (res === 409) {
            setDialogHead("Email already used")
            setDialogBody("Please use a different email address to register you account.")
            setOpen(true)
        } else if (res === 400) {
            setDialogHead("Incomplete information")
            setDialogBody("Please make sure to answer all fields.")
            setOpen(true)
        } else if (res === 500) {
            setDialogHead("Oops, server error")
            setDialogBody("An error occurred on our end. Please try again soon.")
            setOpen(true)
        } else if (res === 200) {
            navigate('/')
        }

        //navigate(location.pathname.slice(0, 18) + "success")
    }

    // Login button handler 
    const handleLogin = () => {
        navigate("/");
    }

    // Calorie budget calculation handler
    const calculateCalorieBudget = () => {
        const maleBMRVar = 5;
        const femaleBMRVar = -161
        let sexSpecificSolution = regState.sex === "male" ? maleBMRVar : femaleBMRVar;

        const bmr = (10 * regState.weight) + (6.25 * regState.height) - (5 * moment(new Date()).diff(new Date(regState.birthday), "years")) + sexSpecificSolution;

        let calorieRequirement = 0;
        // Calculate needed calories per activity level
        switch (regState.activityLevel) {
            case "sedentary":
                calorieRequirement = bmr * 1.2;
                break;
            case "light":
                calorieRequirement = bmr * 1.375;
                break;
            case "moderate":
                calorieRequirement = bmr * 1.55;
                break;
            case "high":
                calorieRequirement = bmr * 1.725;
                break;
            default:
                calorieRequirement = bmr * 1.2;
                break;
        }

        console.log(calorieRequirement)
        // Calculated deficit or addition
        let deficitOrSurplus = regState.weightRange * 7716.179176;
        console.log(deficitOrSurplus)
        if (deficitOrSurplus > 7000) {
            setRegState({
                ...regState,
                isWarning: true
            })
        } else {
            setRegState({
                ...regState,
                isWarning: false
            })
        }
        let calorieBudget = 0;
        // Deduct or add deficit/surplus amount and assign amount to calorie budget
        if (regState.goals.weightGoal === "loseWeight") {
            calorieBudget = calorieRequirement - (deficitOrSurplus / 7);
        } else if (regState.goals.weightGoal === "gainWeight") {
            calorieBudget = calorieRequirement + (deficitOrSurplus / 7);
        } else {
            calorieBudget = calorieRequirement;
        }

        setRegState({
            ...regState,
            calorieBudget: calorieBudget
        })
    }


    //Test states
    useEffect(() => {
        console.log(regState)
    }, [regState]);

    //Test states
    useEffect(() => {
        calculateCalorieBudget();
    }, [regState.weightRange]);


    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", paddingTop: "1rem" }}>
            <Routes>
                <Route path="/" element={<Registration1 />} />
                <Route path="1" element={<Registration1 />} />
                <Route path="2" element={<WeightGoals handleChange={handleWeightGoal} values={regState} />} />
                <Route path="3" element={<Registration3 handleChange={handleCheckboxes} values={regState} />} />
                <Route path="4" element={<Registration4 handleChange={handleChanges} values={regState} />} />
                <Route path="5" element={<Registration5 handleChange={(data) => { handleDateChanges(new Date(data)) }} values={regState} />} />
                <Route path="6" element={<Registration6 handleChange={handleChanges} setState={setRegState} values={regState} />} />
                <Route path="7" element={<Registration7 handleChange={handleChanges} setState={setRegState} values={regState} />} />
                <Route path="8" element={<Registration8 handleChange={handleChanges} setState={setRegState} values={regState} />} />
                <Route path="9" element={<ActivityLevel handleChange={handleChanges} setState={setRegState} values={regState} />} />
                <Route path="10" element={<WeightRange handleChange={handleChanges} setState={setRegState} values={regState} />} />
                <Route path="11" element={<Recommendation handleChange={handleChanges} setState={setRegState} values={regState} calculateCalorieBudget={calculateCalorieBudget} />} />
                <Route path="12" element={<Registration9 />} />
                <Route path="13" element={<Registration10 handleChange={handleChanges} values={regState} />} />
                <Route path="14" element={<Registration11 handleChange={handleChanges} values={regState} open={open} setOpen={setOpen} dialogHead={dialogHead} dialogBody={dialogBody} />} />
                <Route path="success" element={<RegistrationSuccess />} />

            </Routes>

            {parseInt(location.pathname.slice(18)) >= 2 && parseInt(location.pathname.slice(18)) <= 11 ?
                <Container sx={{ paddingBottom: "1rem" }}>
                    <MobileStepper steps={10} LinearProgressProps={{ sx: { width: '100%' } }} activeStep={step} variant="progress" position='static' sx={{ backgroundColor: "rgba(0,0,0, 0)", width: "100%", justifyContent: "center" }} />
                    <Button className="button-full" variant="contained" onClick={goNext}>Continue</Button>
                </Container>
                : <Box> </Box>
            }

            {parseInt(location.pathname.slice(18)) >= 13 && parseInt(location.pathname.slice(18)) <= 14 ?
                <Container sx={{ paddingBottom: "1rem" }}>
                    <MobileStepper steps={3} LinearProgressProps={{ sx: { width: '100%' } }} activeStep={step} variant="progress" position='static' sx={{ backgroundColor: "rgba(0,0,0, 0)", width: "100%", justifyContent: "center" }} />
                    {parseInt(location.pathname.slice(18)) === 14 ?
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
