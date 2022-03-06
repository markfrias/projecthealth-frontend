import { Alert, Avatar, Container, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import React, { useEffect } from "react";
import { FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Delete } from "@mui/icons-material";

const HabitsOnboarding2 = (props) => {
    const navigate = useNavigate();

    const handleLinkClick = (url) => {
        navigate(url);
    }

    useEffect(() => {
        console.log(props.habitsState.habitsForSubmission)

    }, [props]);

    return (
        < Container maxWidth="md" sx={{
            display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", height: "100vh", padding: "1em 1em"
        }
        }>
            <div className="header">
                <h2>Stick to habits</h2>
                <p>Choose from a list of health habits or create your own to start your habit tracking journey.</p>
            </div>
            <FormGroup>
                <h2 style={{ fontSize: 18 }}>Your habits</h2>
                <Button className="button-full" variant="contained" style={{ marginTop: 25, marginBottom: 20 }} onClick={() => { handleLinkClick('/app/habits/3') }}>Create Habit</Button>
                <Button className="button-full" variant="contained" onClick={() => { handleLinkClick('/app/habits/4') }}>Choose from our list</Button>
                <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {props.habitsState.habitsForSubmission.length <= 0 ?
                        <Alert severity="info">Please create or select a habit.</Alert> :

                        props.habitsState.habitsForSubmission.map((value) => {
                            const labelId = `checkbox-list-secondary-label-${value.habitId}`;
                            return (
                                <ListItem
                                    key={value.habitId}
                                    secondaryAction={
                                        <ListItemButton>
                                            <Delete
                                                edge="end"
                                                onClick={(event) => {
                                                    const habitIndex = props.habitsState.habitsForSubmission.indexOf(value);
                                                    let habitsCopy = props.habitsState.habitsForSubmission;
                                                    habitsCopy.splice(habitIndex, 1);
                                                    props.setHabitsState({
                                                        ...props.habitsState,
                                                        habitsForSubmission: habitsCopy,
                                                    })
                                                }}
                                                checked={props.checked.indexOf(value) !== -1}
                                            />
                                        </ListItemButton>

                                    }
                                    disablePadding
                                >
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={`Avatar n°${value + 1}`}
                                                src={`/static/images/avatar/${value + 1}.jpg`}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText id={labelId} primary={value.habitName} secondary={value.goalId} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })


                    }

                </List>


            </FormGroup>
            <Box sx={{ width: "100%" }}>
                <Button fullWidth variant="contained"> Save habits</Button>
            </Box>






        </Container >

    );
}
export default HabitsOnboarding2;