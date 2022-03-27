import React, { useEffect, useState } from "react";
import {
    Typography,
    ListItem,
    ListItemButton,
    ListItemText,
    List,
    IconButton,
    Fab,
    Grid,
    CircularProgress,
    Button
} from "@mui/material";
import { Edit, KeyboardArrowLeft, ThumbDownRounded, ThumbUpAltRounded } from "@mui/icons-material";
import { Box } from "@mui/system";
import { getHabitLogsPersonal, updateHabitJournalEntry } from "../auth/APIServices";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";


export default function HabitScreen() {

    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleLike = async (habitEntryId, habitAccomplished, index, arr) => {
        console.log(index)
        await updateHabitJournalEntry(habitEntryId, 1);
        const habitsCopy = habits;
        console.log(habitsCopy)
        habitsCopy.splice(index, 1, { goalName: arr[index].goalName, habitAccomplished: 1, habitEntryDate: arr[index].habitEntryDate, habitId: arr[index].habitId, habitName: arr[index].habitName, habitEntryId: habitEntryId });
        //console.log(splicedHabits)
        setHabits(habitsCopy)
    }

    const handleUnlike = async (habitEntryId, habitAccomplished, index, arr) => {
        console.log(index)
        await updateHabitJournalEntry(habitEntryId, 0);
        const habitsCopy = habits;
        console.log(habitsCopy)
        habitsCopy.splice(index, 1, { goalName: arr[index].goalName, habitAccomplished: 0, habitEntryDate: arr[index].habitEntryDate, habitId: arr[index].habitId, habitName: arr[index].habitName, habitEntryId: habitEntryId });
        //console.log(splicedHabits)
        setHabits(habitsCopy)
    }

    // Fetch habits
    useEffect(() => {
        (async () => {
            setLoading(true);
            const newHabits = await getHabitLogsPersonal(moment().format('YYYY'), moment().format('MM'), moment().format('DD'));
            console.log(newHabits)
            console.log(moment().format('YYYY'), moment().format('MM'), moment().format('DD'))
            setHabits(newHabits)
        })()
    }, []);

    useEffect(() => {
        if (habits.length !== undefined) {
            setLoading(false);
        }
    }, [habits])

    const navigate = useNavigate();

    return (

        loading ?
            <Grid container direction="column" sx={{ height: '100vh' }} alignItems="center" justifyContent="center">
                <CircularProgress variant='indeterminate' sx={{ mb: '2em' }} />
                <Typography variant="p">Loading content</Typography>
            </Grid>
            :

            habits.length < 1 ?




                <Grid container direction="column">
                    < Grid item xs={12}
                        container direction='column' sx={{ background: '#F9AB10', p: '1em', mb: '1em' }
                        }
                    >
                        <Button className='button-quicknote' variant='text' sx={{ color: 'black' }} startIcon={<KeyboardArrowLeft />} onClick={() => { navigate('/app/profile') }}>Back</Button>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item> <Typography variant="onboardingHeader2" component="h1">Habits</Typography  ></Grid>


                        </Grid>
                    </Grid>

                    <Grid item>You don't have any tracked habits. Press the edit habits button to get started.</Grid>

                    <Fab variant="extended" color="primary" sx={{ position: "fixed", bottom: '5em', right: '1em' }} component={Link} to="/app/habits/1">
                        <Edit />
                        Edit habits
                    </Fab>


                </Grid >
                :
                <Grid container>
                    < Grid item xs={12}
                        container direction='column' sx={{ background: '#F9AB10', p: '1em', mb: '1em' }
                        }
                    >
                        <Button className='button-quicknote' variant='text' sx={{ color: 'black' }} startIcon={<KeyboardArrowLeft />} onClick={() => { navigate('/app/food/search') }}>Back</Button>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item> <Typography variant="onboardingHeader2" component="h1">Habits</Typography  ></Grid>


                        </Grid>
                    </Grid>
                    <Fab variant="extended" color="primary" sx={{ position: "fixed", bottom: '5em', right: '1em' }} component={Link} to="/app/habits/1">
                        <Edit />
                        Edit habits
                    </Fab>

                    <List sx={{ width: '100%', maxWidth: 360 }}>
                        {habits.map((value, index, array) => {
                            const labelId = `checkbox-list-label-${value.habitId}`;

                            return (
                                <ListItem
                                    key={value.habitEntryId}
                                    secondaryAction={
                                        value.habitAccomplished ?
                                            <Box>
                                                <IconButton edge="end" aria-label="comments" onClick={() => { handleLike(value.habitEntryId, value.habitAccomplished, index, array) }}>
                                                    <ThumbUpAltRounded color="green" />

                                                </IconButton>
                                                <IconButton edge="end" aria-label="comments" onClick={() => { handleUnlike(value.habitEntryId, value.habitAccomplished, index, array) }}>
                                                    <ThumbDownRounded />


                                                </IconButton>

                                            </Box> :
                                            <Box>
                                                <IconButton edge="end" aria-label="comments" onClick={() => { handleLike(value.habitEntryId, value.habitAccomplished, index, array) }}>
                                                    <ThumbUpAltRounded />

                                                </IconButton>
                                                <IconButton edge="end" aria-label="comments" onClick={() => { handleUnlike(value.habitEntryId, value.habitAccomplished, index, array) }}>
                                                    <ThumbDownRounded color="red" />


                                                </IconButton>

                                            </Box>


                                    }
                                    disablePadding
                                >
                                    <ListItemButton role={undefined} onClick={handleToggle(value)} dense>

                                        <ListItemText id={labelId} primary={value.habitName} secondary={"Goal habits"} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>

                    <Fab variant="extended" color="primary" sx={{ position: "fixed", bottom: '5em', right: '1em' }} component={Link} to="/app/habits/1">
                        <Edit />
                        Edit habits
                    </Fab>


                </Grid >



    );
}
