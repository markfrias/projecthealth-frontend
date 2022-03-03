import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HabitsOnboarding1 from '../habits/HabitsOnboarding1';
import HabitsOnboarding2 from '../habits/HabitsOnboarding2';
import HabitsOnboarding3 from '../habits/HabitsOnboarding3';
import HabitsOnboarding4 from '../habits/HabitsOnboarding4';

const Habits = () => {
    const initialState = {
        habitsForSubmission: [],
        newHabit: {
            habitName: "",
            habitDescription: "",
            goalCategory: "",
        },
        habitName: "",
        habitDescription: "",
        goalCategory: "",
        goalAutocomplete: [{ label: "Kim Mingyu" }],
        goalCategoryValue: { label: "Kim Mingyu" },
        goalCategoryInputValue: ""
    }
    const options = [
        { label: "Kim Mingyu", id: 1 },
        { label: "Seungcheol", id: 2 }
    ]

    // Habits pages state
    const [habitsState, setHabitsState] = useState(initialState);
    const [prepChecked, setPrepChecked] = useState([1]);
    const [goalOptions, setGoalOptions] = useState(options);
    const [goalCategoryValue, setGoalCategoryValue] = useState(goalOptions[0])




    // Handle goal category autocomplete value
    const handleGoalCatValue = (event) => {
        setHabitsState({
            ...habitsState,
            goalCategoryValue: event.target.value
        })
    }

    const handleGoalCatInputValue = (newInputValue) => {
        setHabitsState({
            ...habitsState,
            goalCategoryInputValue: newInputValue
        })
    }

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

    const handleChange = (event) => {
        const target = event.target;

        setHabitsState({
            ...habitsState,
            [target.name]: target.value
        })
    }

    // Test function
    /*
    useEffect(() => {
        console.log(prepChecked.indexOf(0))

    }, []);
    */

    return (
        <Routes>
            <Route path="1" element={<HabitsOnboarding1 />} />
            <Route path="2" element={<HabitsOnboarding2 handleToggle={handlePrepToggle} checked={prepChecked} habitsState={habitsState} handleGoalCatInputValue={handleGoalCatInputValue} handleGoalCatValue={handleGoalCatValue} goalCategoryValue={goalCategoryValue} setGoalCategoryValue={setGoalCategoryValue} />} />
            <Route path="3" element={<HabitsOnboarding3 handleChange={handleChange} habitsState={habitsState} setHabitsState={setHabitsState} goalCategoryValue={goalCategoryValue} setGoalCategoryValue={setGoalCategoryValue} goalOptions={goalOptions} />} />
            <Route path="4" element={<HabitsOnboarding4 />} />

        </Routes>
    );
}

export default Habits;
