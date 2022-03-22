import { Autocomplete, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormGroup, Button, TextField } from "@mui/material";
import { createHabit, getGoalsSync } from "../auth/APIServices";
import { useNavigate } from "react-router-dom";

const HabitsOnboarding3 = (props) => {
    // Test code
    const [goalCats, setGoalCats] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        setGoalCats(getGoalsSync());
    }, []);

    const [open, setOpen] = useState(false);
    const [modalHeading, setModalHeading] = useState("");
    const [modalBody, setModalBody] = useState("");
    const handleClose = () => {
        setOpen(false);
        navigate('/app/habits/2')
    }

    const handleSaveHabit = async () => {
        const rawResponse = await createHabit(props.habitsState.habitName, props.habitsState.habitDescription, props.goalCategoryValue);
        const response = await rawResponse.json();
        if (rawResponse.status === 200) {
            setOpen(true);
            setModalHeading("Habit saved!")
            setModalBody("The habit you created has been successfully saved.");
            props.setHabitsState({
                ...props.habitsState,
                habitId: response.insertId
            })
            // Insert new habit into habits for submission
            const newHabit = {
                habitId: response.insertId,
                habitName: props.habitsState.habitName,
                habitDescription: props.habitsState.habitDescription,
                goalId: props.goalCategoryValue.goalId
            }

            const newHabits = props.habitsState.habitsForSubmission;
            newHabits.push(newHabit);
            props.setHabitsState({
                ...props.habitsState,
                habitsForSubmission: newHabits
            })

        } else if (rawResponse.status === 400) {
            setOpen(true);
            setModalHeading("Incorrect or incomplete input")
            setModalBody("Please make sure that you have completely filled up all required fields.")
        } else if (rawResponse.status === 500) {
            setOpen(true);
            setModalHeading("Server error")
            setModalBody("Oops! Something wrong happened on our end. Please try again later.")
        } else {
            setOpen(true);
            setModalHeading("Something wrong happened")
            setModalBody("We're not sure what happened, but we're at it to fix it.")
        }
    }

    return (
        <Container maxWidth="md" sx={{
            display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", height: "100vh"
        }}>
            <div className="header" style={{ marginLeft: 10 }}>

                <p>Create a habit by filling all the required fields below.</p>
                <p><i>*required fields</i></p>
            </div>
            <FormGroup style={{ marginBottom: 200, marginLeft: 10 }}>

                <h2 style={{ fontSize: 18 }}>Habit Name*</h2>
                <TextField
                    helperText="e.g., Eat a fruit every breakfast"
                    id="demo-helper-text-misaligned"
                    label="Name"
                    name="habitName"
                    value={props.habitsState.habitName}
                    onChange={props.handleChange}
                />
                <h2 style={{ fontSize: 18 }}>Habit Description*</h2>
                <TextField
                    helperText="e.g., Eat a fruit every day for breakfast to increase fruit consumption."
                    id="demo-helper-text-misaligned"
                    label="Description"
                    name="habitDescription"
                    value={props.habitsState.habitDescription}
                    onChange={props.handleChange}
                />
                <h2 style={{ fontSize: 18 }}>Goal Category</h2>

                <Autocomplete
                    disablePortal
                    getOptionLabel={option => option.goalName}
                    id="combo-box-demo"
                    options={goalCats}
                    value={props.goalCategoryValue}
                    onChange={(event, newValue) => {
                        props.setGoalCategoryValue(newValue)
                    }}
                    inputValue={props.habitsState.goalCategoryInputValue}
                    isOptionEqualToValue={(option, value) => option.goalName === value.goalName && option.goalId === value.goalId}
                    onInputChange={(event, newInputValue) => {
                        props.setHabitsState({
                            ...props.habitsState,
                            goalCategoryInputValue: newInputValue
                        })
                    }}
                    renderInput={(params) => <TextField {...params} label="Goal Category" />}
                />


            </FormGroup>
            <div className="button-class" style={{ marginBottom: 20 }}>
                <Button className="button-full" variant="contained" onClick={handleSaveHabit}> Save habits</Button>

            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {modalHeading}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {modalBody}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Okay</Button>
                </DialogActions>
            </Dialog>




        </Container>

    );
}
export default HabitsOnboarding3;