import { Autocomplete, Container } from "@mui/material";
import React, { useEffect } from "react";
import { FormGroup, Button, TextField } from "@mui/material";

const HabitsOnboarding3 = (props) => {
    // Test code

    useEffect(() => {
        console.log(props.habitsState);
    }, [props.habitsState]);

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
                <TextField
                    helperText="e.g., Eat healthier."
                    id="demo-helper-text-misaligned"
                    label="Category"
                    name="habitCategory"
                    value={props.habitsState.goalCategory}
                    onChange={props.handleChange}
                />

                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={props.goalOptions}
                    value={props.goalCategoryValue}
                    onChange={(event, newValue) => {
                        props.setGoalCategoryValue(newValue)
                    }}
                    inputValue={props.habitsState.goalCategoryInputValue}
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
                <Button className="button-full" variant="contained"> Save habits</Button>

            </div>




        </Container>

    );
}
export default HabitsOnboarding3;