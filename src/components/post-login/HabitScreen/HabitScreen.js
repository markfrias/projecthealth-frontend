import React from "react";
import {
    Container,
    ToggleButton,
    ToggleButtonGroup,
    Button,
    Chip
} from "@mui/material";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import EditIcon from '@mui/icons-material/Edit';


export default function HabitScreen() {

    const [like, setView] = React.useState('like');


    const handleChange = (event, nextLike) => {
        setView(nextLike);
    };


    return (
        <Container maxWidth="md" sx={"display: flex; flex-direction: column; justify-content: space-between; min-height: 100vh"}>
            <div className="header" style={{ marginLeft: 10 }}>
                <h2>Habits</h2>
                <img alt="Success" height={100} width={100} src={require("../../../assets/img/success.png")} />You’ve stuck with all your habits for the past 3 days

            </div>
            <ToggleButtonGroup
                orientation="vertical"
                value={like}
                exclusive
                onChange={handleChange}

            >
                <h2>Did I stick to my habits today?</h2>
                <div>
                    <p>Brush teeth thrice a day</p>
                    <Chip
                       icon={<ThumbUpOutlinedIcon />} 
                        component="a"
                        href="#basic-chip"
                        variant="outlined"
                        clickable
                    />
                    <Chip
                       icon={<ThumbDownAltOutlinedIcon />} 
                        component="a"
                        href="#basic-chip"
                        variant="outlined"
                        clickable
                    />
                </div>

                <div>
                    <p>Drink at least 8 glasses of fluids</p>
                    <Chip
                       icon={<ThumbUpOutlinedIcon />} 
                        component="a"
                        href="#basic-chip"
                        variant="outlined"
                        clickable
                    />
                      <Chip
                       icon={<ThumbDownAltOutlinedIcon />} 
                        component="a"
                        href="#basic-chip"
                        variant="outlined"
                        clickable
                    />
                </div>
                <div>
                    <p>Ate a fruit</p>
                    <Chip
                       icon={<ThumbUpOutlinedIcon />} 
                        component="a"
                        href="#basic-chip"
                        variant="outlined"
                        clickable
                    />
                   <Chip
                       icon={<ThumbDownAltOutlinedIcon />} 
                        component="a"
                        href="#basic-chip"
                        variant="outlined"
                        clickable
                    />
                </div>

            </ToggleButtonGroup>

            <div className='edit-button'>
                <Button variant="contained" aria-label="Edit" >
                    <EditIcon /> Edit Habits
                </Button>
            </div>


        </Container >

    );
}
