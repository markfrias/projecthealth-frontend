import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getGoalsSync, getUserHabits } from '../auth/APIServices';
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
        habitId: "",
        goalAutocomplete: [{ label: "Kim Mingyu" }],
        goalCategoryValue: { label: "Kim Mingyu" },
        goalCategoryInputValue: ""
    }
    const options = [
        { label: "Kim Mingyu", id: 1 },
        { label: "Seungcheol", id: 2 }
    ]

    const sampleHabits = [


    ]

    const defaultArrForHabits = [
        {
            habitId: 3,
            habitName: "Luh, ganda ka ghorl?",
            goalId: 2
        }
    ]

    // Habits pages state
    const [defaultArray, setDefaultArray] = useState(defaultArrForHabits);
    const [habitsState, setHabitsState] = useState(initialState);
    const [habitsToAdd, setHabitsToAdd] = useState(sampleHabits);
    const [habitsToAddChecked, setHabitsToAddChecked] = useState([0]);
    const [prepChecked, setPrepChecked] = useState([1]);
    const [resultsChecked, setResultsChecked] = useState([1]);
    const [selectionChecked, setSelectionChecked] = useState([0]);
    const goalOptions = options;
    const [goalCategoryValue, setGoalCategoryValue] = useState(getGoalsSync()[0])
    const [habitsAutoComplete, setHabitsAutocomplete] = useState()








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

    // Handle changes to checkboxes in second page
    const handlePrepToggle = (value) => {
        const currentIndex = prepChecked.indexOf(value);
        const newChecked = [...prepChecked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setPrepChecked(newChecked);
    };

    const handleResultsToggle = (value) => {
        const currentIndex = resultsChecked.indexOf(value.habitId);
        const newChecked = [...resultsChecked];

        if (currentIndex === -1) {
            newChecked.push(value.habitId);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setResultsChecked(newChecked);
    };

    // Handle changes to checkboxes in last page
    // Handle changes to checkboxes in second page
    const handleSelectionToggle = (value) => {
        const currentIndex = selectionChecked.indexOf(value.habitId);
        console.log(currentIndex)
        const newChecked = [...selectionChecked];

        if (currentIndex === -1) {
            newChecked.push(value.habitId);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setSelectionChecked(newChecked);
    };

    // Handle changes to checkboxes in habits to add list
    const handleHabitsToAddToggle = (value) => {
        const currentIndex = habitsToAddChecked.indexOf(value.habitId);
        console.log(currentIndex);
        const newChecked = [...habitsToAddChecked];

        if (currentIndex === -1) {
            newChecked.push(value.habitId);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setHabitsToAddChecked(newChecked);
    };

    const handleChange = (event) => {
        const target = event.target;

        setHabitsState({
            ...habitsState,
            [target.name]: target.value
        })
    }

    // Test function
    useEffect(() => {
        console.log(selectionChecked)
    }, [selectionChecked]);

    useEffect(() => {
        const fetchUsers = async () => {
            const habits = await getUserHabits();
            const newArray = habitsState.habitsForSubmission;
            habits.forEach((habit) => {
                newArray.push(habit);
            });
            setHabitsState({
                ...habitsState,
                habitsForSubmission: newArray

            })
        }
        if (habitsState.habitsForSubmission.length <= 0) {
            fetchUsers();
        }
    }, [habitsState])



    return (
        <Routes>
            <Route path="1" element={<HabitsOnboarding1 />} />
            <Route path="2" element={<HabitsOnboarding2 handleToggle={handlePrepToggle} checked={prepChecked} habitsState={habitsState} handleGoalCatInputValue={handleGoalCatInputValue} handleGoalCatValue={handleGoalCatValue} goalCategoryValue={goalCategoryValue} setGoalCategoryValue={setGoalCategoryValue} setHabitsState={setHabitsState} />} />
            <Route path="3" element={<HabitsOnboarding3 handleChange={handleChange} habitsState={habitsState} setHabitsState={setHabitsState} goalCategoryValue={goalCategoryValue} setGoalCategoryValue={setGoalCategoryValue} goalOptions={goalOptions} />} />
            <Route path="4" element={<HabitsOnboarding4 habitsState={habitsState} handleToggle={handleSelectionToggle} checked={selectionChecked} goalCategoryValue={goalCategoryValue} setGoalCategoryValue={setGoalCategoryValue} goalOptions={goalOptions} setHabitsState={setHabitsState} habitsToAdd={habitsToAdd} habitsChecked={habitsToAddChecked} handleHabitsToAddToggle={handleHabitsToAddToggle} setHabitsToAdd={setHabitsToAdd} handleResultsToggle={handleResultsToggle} resultsChecked={resultsChecked} habitAuto={habitsAutoComplete} setHabitsAuto={setHabitsAutocomplete} habitsDef={defaultArray} setHabitsDef={setDefaultArray} />} />

        </Routes>
    );
}

export default Habits;
