import { Container } from "@mui/material";
import React from "react";
import { FormGroup, Button, TextField } from "@mui/material";

const HabitsOnboarding3 = () => {
    return (
        <Container maxWidth="md" sx={{
            display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", height: "100vh"
        }}>
            <div className="header" style={{ marginLeft: 10 }}>

                <p>Create a habit by filling all the required fields below.</p>
                <p>*required filleds</p>
            </div>
            <FormGroup style={{ marginBottom: 200, marginLeft: 10 }}>
                <h2 style={{ fontSize: 18 }}>Habit Name*</h2>
                <TextField
                    helperText="e.g., Eat a fruit every breakfast"
                    id="demo-helper-text-misaligned"
                    label="Name"
                />
                <h2 style={{ fontSize: 18 }}>Habit Description*</h2>
                <TextField
                    helperText="e.g., Eat a fruit every day for breakfast to increase fruit consumption."
                    id="demo-helper-text-misaligned"
                    label="Description"
                />
                <h2 style={{ fontSize: 18 }}>Goal Category</h2>
                <TextField
                    helperText="e.g., Eat healthier."
                    id="demo-helper-text-misaligned"
                    label="Category"
                />


            </FormGroup>
            <div className="button-class" style={{ marginBottom: 20 }}>
                <Button className="button-full" variant="contained"> Save habits</Button>

            </div>




        </Container>

    );
}
export default HabitsOnboarding3;