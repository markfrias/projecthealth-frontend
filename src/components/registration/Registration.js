import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
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

    //Test states
    useEffect(() => {
        console.log(regState.goalWeight)
    }, [regState]);


    return (
        <div>
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
        </div>
    );
}

export default Registration;
