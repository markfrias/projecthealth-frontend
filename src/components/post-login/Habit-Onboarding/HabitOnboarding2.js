import { Container } from "@mui/material";
import React from "react";
import { FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";

const HabitOnboarding2 = () => {
    return (
        <Container maxWidth="md" sx={"display: flex; flex-direction: column; justify-content: space-between; min-height: 100vh"}>
            <div className="header" style={{ marginLeft: 10 }}>
                <h2>Stick to habits</h2>
                <p>Choose from a list of health habits or create your own to start your habit tracking journey.</p>
            </div>
            <FormGroup style={{ marginBottom: 350, marginLeft: 10 }}>
                <h2 style={{ fontSize: 18 }}>Your habits</h2>
                <FormControlLabel control={<Checkbox />} label="Brush teeth thrice a day" />
                <FormControlLabel control={<Checkbox />} label="Go to bed at 10pm" />

                <Button className="button-full" variant="contained" style={{marginTop: 25, marginBottom: 20}}>Create Habit</Button>
                <Button className="button-full" variant="contained">Choose from our list</Button>

            </FormGroup>
            <div className="button-class" style={{marginBottom: 10}}>
            <Button className="button-full" variant="contained"> Save habits</Button>

            </div>




        </Container>

    );
}
export default HabitOnboarding2