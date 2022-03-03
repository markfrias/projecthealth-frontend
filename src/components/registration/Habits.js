import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HabitsOnboarding1 from '../habits/HabitsOnboarding1';
import HabitsOnboarding2 from '../habits/HabitsOnboarding2';
import HabitsOnboarding3 from '../habits/HabitsOnboarding3';
import HabitsOnboarding4 from '../habits/HabitsOnboarding4';

const Habits = () => {
    const initialState = {
        habitsForSubmission: []
    }


    // Habits pages state
    const [habitsState, setHabitsState] = useState(initialState);
    const [prepChecked, setPrepChecked] = useState([1]);

    const handlePrepToggle = (value) => () => {
        const currentIndex = prepChecked.indexOf(value);
        const newChecked = [...prepChecked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setPrepChecked(newChecked);
    };

    useEffect(() => {
        console.log(prepChecked.indexOf(0))

    }, []);

    return (
        <Routes>
            <Route path="1" element={<HabitsOnboarding1 />} />
            <Route path="2" element={<HabitsOnboarding2 handleToggle={handlePrepToggle} checked={prepChecked} habitsState={habitsState} />} />
            <Route path="3" element={<HabitsOnboarding3 />} />
            <Route path="4" element={<HabitsOnboarding4 />} />

        </Routes>
    );
}

export default Habits;
