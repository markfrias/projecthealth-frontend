import { Alert, Avatar, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import React, { useState } from "react";
import { FormGroup, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Delete } from "@mui/icons-material";
import { saveHabits } from "../auth/APIServices";

const HabitsOnboarding2 = (props) => {
    const navigate = useNavigate();

    const handleLinkClick = (url) => {
        navigate(url);
    }
    const [open, setOpen] = useState(false);
    const [modalHeading, setModalHeading] = useState("");
    const [modalBody, setModalBody] = useState("");
    const handleClose = () => {
        setOpen(false);
        navigate('/app/habitscreen')
    }

    const handleSaveHabits = async () => {
        const rawResponse = await saveHabits(props.habitsState.habitsForSubmission);
        const response = await rawResponse.json();
        console.log(response)

        if (rawResponse.status === 200) {
            setOpen(true);
            setModalHeading("Habit preferences saved!")
            setModalBody("Your habit preferences have been successfully saved.");

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



    /*useEffect(() => {
        const fetchUsers = async () => {
            const habits = await getUserHabits();
            const newArray = props.habitsState.habitsForSubmission;
            habits.forEach((habit) => {
                newArray.push(habit);
            });
            console.log(newArray)
            props.setHabitsState({
                ...props.habitsState,
                habitsForSubmission: newArray

            })
        }

        if (props.habitsState.habitsForSubmission.length <= 0) {
            fetchUsers();
        }


    }, [props])*/

    return (
        < Container maxWidth="sm" sx={{
            display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", padding: "2em 1em"
        }
        }>
            <Box className="header" sx={{ mb: '4em' }}>
                <Typography variant="bigHeading" component="h1" sx={{ width: '100%', mb: 2 }}>Stick to habits</Typography>
                <Typography variant="subtitle1" component="h2" sx={{ mb: '4em' }}>Choose from a list of health habits or create your own to start your habit tracking journey.</Typography>
                <FormGroup sx={{ width: '100%' }}>
                    <Button color="secondary" className="button-full" variant="contained" sx={{ height: '2.5em', mb: '1em' }} onClick={() => { handleLinkClick('/app/habits/3') }}>Create Habit</Button>
                    <p style={{ textAlign: 'center' }}>OR</p>
                    <Button color="secondary" className="button-full" variant="contained" sx={{ height: '2.5em', mb: '4em' }} onClick={() => { handleLinkClick('/app/habits/4') }}>Choose from our list</Button>
                    <Typography variant='onboardingHeader2' component='h2' >Your habits</Typography>

                    <List dense sx={{ width: '100%' }}>
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
            </Box>

            <Box sx={{ width: "100%", justifyContent: 'space-between' }}>

                <Button fullWidth variant="contained" onClick={handleSaveHabits} sx={{ mb: '1rem' }}> Save habits</Button>

                <Button fullWidth variant="contained" component={Link} to="/app/habitscreen"> Back</Button>

            </Box>

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






        </Container >

    );
}
export default HabitsOnboarding2;