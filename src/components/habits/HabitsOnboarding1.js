import { Container, Typography } from "@mui/material";
import React from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HabitsOnboarding1 = () => {
    const navigate = useNavigate();

    const handleLinkClick = (url) => {
        navigate(url);
    }

    return (
        <Container maxWidth="md" sx={{
            display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", height: "100vh", width: "100%", py: 2
        }}>
            <Box sx={{ width: "80%", height: "auto" }}>
                <img width="100%" height="100%" alt="Woman sitting down and reading" src={require("../../assets/img/casual-life-3d-reading.png")} />
            </Box>
            <Box>
                <Typography variant="bigHeading" component="h1">Stick to habits</Typography>
                <Typography variant="bigHeadingSub" component="h2">Choose from a list of health habits or create your own to start your habit tracking journey.</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <Button variant="text" onClick={() => { handleLinkClick(-1) }}>
                    Not now
                </Button>
                <Button className="button-half" variant="contained" onClick={() => { handleLinkClick('/app/habits/2') }} >
                    Continue
                </Button>
            </Box>



        </Container >

    );
}
export default HabitsOnboarding1