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
    Button,
    ToggleButtonGroup,
    ToggleButton
} from "@mui/material";
import { Edit, KeyboardArrowLeft, ThumbDownRounded, ThumbUp, ThumbUpAltRounded } from "@mui/icons-material";
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

    const handleLike = async (event, value, habitEntryId, index, arr) => {
        console.log(value)
        setLoading(true)
        await updateHabitJournalEntry(habitEntryId, value);
        const habitsCopy = habits;
        console.log(habitsCopy)
        habitsCopy.splice(index, 1, { goalName: arr[index].goalName, habitAccomplished: value, habitEntryDate: arr[index].habitEntryDate, habitId: arr[index].habitId, habitName: arr[index].habitName, habitEntryId: habitEntryId });
        console.log(habitsCopy)
        setHabits(habitsCopy)
        window.location.reload();

    }

    const handleUnlike = async (habitEntryId, habitAccomplished, index, arr) => {
        console.log(index)
        await updateHabitJournalEntry(habitEntryId, 0);
        const habitsCopy = habits;
        console.log(habitsCopy)
        habitsCopy.splice(index, 1, { goalName: arr[index].goalName, habitAccomplished: 0, habitEntryDate: arr[index].habitEntryDate, habitId: arr[index].habitId, habitName: arr[index].habitName, habitEntryId: habitEntryId });
        //console.log(splicedHabits)
        setHabits(habitsCopy)
        window.location.reload();
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
        console.log(habits)
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


                loading ?
                    <Grid container direction="column" sx={{ height: '100vh' }} alignItems="center" justifyContent="center">
                        <CircularProgress variant='indeterminate' sx={{ mb: '2em' }} />
                        <Typography variant="p">Loading content</Typography>
                    </Grid>
                    :

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







                                    disablePadding
                                >
                                    <ListItemButton role={undefined} dense>

                                        <ListItemText id={labelId} primary={value.habitName} secondary={"Goal habits" + habits[0].habitAccomplished} />
                                    </ListItemButton>
                                    <ToggleButtonGroup
                                        value={habits[index].habitAccomplished}
                                        exclusive
                                        onChange={(event, newValue) => { handleLike(event, newValue, value.habitEntryId, index, array) }}
                                    >

                                        <ToggleButton value={1}>
                                            <ThumbUp />
                                        </ToggleButton>
                                        <ToggleButton value={0}>
                                            <ThumbDownRounded />
                                        </ToggleButton>
                                    </ToggleButtonGroup>
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
