import { Container } from "@mui/material";
import React from "react";
import { Link, Button } from "@mui/material";

const HabitOnboarding1 = () => {
    return (
        <Container maxWidth="md" sx={"display: flex; flex-direction: column; justify-content: space-between; min-height: 100vh"}>
            <div className="hero_container" style={{ marginTop: 180 }}>
                <img alt="Habit" src={require("../../../assets/img/woman_reading.png")} />
            </div>
            <div style={{ marginBottom: 200, marginLeft: 55 }}>
                <h2 style={{fontSize:26}}>Stick to habits</h2>
                <p>Choose from a list of health habits or create your own to start your habit tracking journey.</p>
            </div>
            <div className='button-group' style={{ marginLeft: 50 }}>
                <Link href="#">Not Now</Link>
                <Button className="button-half" variant="contained" style={{marginLeft: 100}}> Continue </Button>
            </div>



        </Container>

    );
}
export default HabitOnboarding1