import { Autocomplete, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormGroup, Button, TextField } from "@mui/material";
import { createHabit, getGoalsSync } from "../auth/APIServices";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "victory";
import { Close, KeyboardArrowLeftRounded } from "@mui/icons-material";

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
        //console.log(response)
        if (rawResponse.status === 200) {
            setOpen(true);
            setModalHeading("Habit saved!")
            setModalBody("The habit you created has been successfully saved.");
            props.setHabitsState({
                ...props.habitsState,
                habitId: response.insertId
            })
            //console.log(response)
            //console.log(props.habitsState.habitId)

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
            display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", padding: '2em', justifyContent: "space-between"
        }}>
            <Grid>
                <Grid item container direction="column" className="header" mb="3em">
                    <Button variant='text' sx={{ color: 'black', padding: '0', mb: '.5em', alignSelf: 'flex-start' }} startIcon={<Close />} component={Link} to="/app/habits/2">Create a habit</Button>

                    <Typography variant="subtitle1" component="h2">Create a habit by filling all the required fields below.</Typography>
                </Grid>
                <FormGroup>

                    <TextField
                        helperText="e.g., Eat a fruit every breakfast"
                        id="demo-helper-text-misaligned"
                        label="Name"
                        name="habitName"
                        value={props.habitsState.habitName}
                        onChange={props.handleChange}
                        sx={{ mb: '2em' }}
                    />
                    <TextField
                        helperText="e.g., Eat a fruit every day for breakfast to increase fruit consumption."
                        id="demo-helper-text-misaligned"
                        label="Description"
                        name="habitDescription"
                        value={props.habitsState.habitDescription}
                        onChange={props.handleChange}
                        sx={{ mb: '2em' }}
                    />

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
                        sx={{ mb: '2em' }}
                    />


                </FormGroup>
            </Grid>

            <Button variant="contained" onClick={handleSaveHabit} fullWidth> Save habits</Button>

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