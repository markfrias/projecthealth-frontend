import React, { useEffect, useState } from "react";
import {
    Typography,
    ListItem,
    ListItemButton,
    ListItemText,
    List,
    Fab,
    Grid,
    CircularProgress,
    ToggleButtonGroup,
    ToggleButton,
    Backdrop,
    Divider
} from "@mui/material";
import { Edit, ThumbDownRounded, ThumbUp } from "@mui/icons-material";
import { getHabitLogsPersonal, updateHabitJournalEntry } from "../auth/APIServices";
import moment from "moment";
import { Link } from "react-router-dom";
import { addHp, addPp, pickMeme } from "../auth/GamificationAPI";


export default function HabitScreen(props) {

    const [habits, setHabits] = useState();
    const [loading, setLoading] = useState(true);

    // State for modal content
    const [dialogHead, setDialogHead] = useState();
    const [dialogBody, setDialogBody] = useState();
    const [openSuccess, setOpenSuccess] = React.useState(false);

    const handleLike = async (event, value, habitEntryId, index, arr) => {
        if (value === 1) {
            setDialogHead('Your pet earned 5 points');
            setDialogBody(`Graaape 🍇🍇🍇.`)
            setOpenSuccess(true);
        }

        // Level up if pp expands beyond boundary
        if ((props.pp + 5) / props.ppBoundary * 100 >= 100) {
            // Save old level
            const oldLevel = props.account.levelId;

            props.setAccount({
                ...props.account,
                levelId: props.account.levelId + 1
            })
            console.log((props.pp + 5) - props.ppBoundary)
            props.setPp((props.pp + 5) - props.ppBoundary);
            console.log(props.ppBoundary + 5)
            addHp(props.hp + 3);
            props.setHp(props.hp + 3);

            props.setPpBoundary(props.ppBoundary + 5)
            setDialogHead('Your pet leveled up');
            setDialogBody(`Graaape 🍇🍇🍇. Your pet's health increased. Graaape, see dashboard to see where to go next 🍇🍇🍇.`)
            setOpenSuccess(true);

            addPp((props.pp + 5) - props.ppBoundary, props.ppBoundary, oldLevel + 1)

            await updateHabitJournalEntry(habitEntryId, value);
            const habitsCopy = habits;
            console.log(habitsCopy)
            habitsCopy.splice(index, 1, { goalName: arr[index].goalName, habitAccomplished: value, habitEntryDate: arr[index].habitEntryDate, habitId: arr[index].habitId, habitName: arr[index].habitName, habitEntryId: habitEntryId });
            console.log(habitsCopy)
            setHabits(habitsCopy)
            window.location.reload();

            return


        }
        if (value === 1) {
            props.setPp(props.pp + 5, props.ppBoundary)
            addPp(props.pp + 5, props.ppBoundary, props.account.levelId)
        }



        console.log(value)
        await updateHabitJournalEntry(habitEntryId, value);
        const habitsCopy = habits;
        console.log(habitsCopy)
        habitsCopy.splice(index, 1, { goalName: arr[index].goalName, habitAccomplished: value, habitEntryDate: arr[index].habitEntryDate, habitId: arr[index].habitId, habitName: arr[index].habitName, habitEntryId: habitEntryId });
        console.log(habitsCopy)
        setHabits(habitsCopy)
        if (value === 0) {
            window.location.reload();
        }


    }


    // Fetch habits
    useEffect(() => {
        (async () => {
            setLoading(true);
            const newHabits = await getHabitLogsPersonal(moment().format('YYYY'), moment().format('MM'), moment().format('DD'));
            console.log(newHabits)
            setHabits(newHabits)
        })()
    }, []);

    useEffect(() => {
        console.log(habits);
        if (habits !== undefined) {
            setLoading(false);
        }
    }, [habits])

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
                        <Grid container justifyContent="space-between" alignItems="center" pt={2}>
                            <Grid item> <Typography variant="onboardingHeader2" component="h1">Habits</Typography  ></Grid>


                        </Grid>
                    </Grid>

                    <Grid item px={1}>You don't have any tracked habits. Press the <strong>"Edit habits"</strong> button to get started.</Grid>

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
                        <Grid container justifyContent="space-between" alignItems="center" pt={1}>
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
                                    sx={{ mb: '1em' }}
                                    key={value.habitEntryId}
                                    disablePadding
                                >
                                    <ListItemButton role={undefined} dense>

                                        <ListItemText id={labelId} primary={value.habitName} />
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


                    <Backdrop
                        sx={{ color: '#fff', backdropFilter: 'blur(5px)', zIndex: (theme) => theme.zIndex.drawer + 1, px: 2 }}
                        open={openSuccess}
                        onClick={() => {
                            window.location.reload();
                        }}>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <div sx={{ width: '100%', height: '0', paddingBottom: '80%', position: 'relative' }}><iframe title="gif" src={`https://giphy.com/embed/${pickMeme('success')}`} width="100%" height="100%" sx={{ position: "absolute" }} frameBorder="0" className="giphy-embed" allowFullScreen></iframe></div>
                            </Grid>
                            <Grid item xs={12}>
                                <h1>{dialogHead}</h1>
                            </Grid>
                            <Grid item xs={12}>
                                <p>{dialogBody}</p>
                            </Grid>
                        </Grid>
                    </Backdrop>
                </Grid>
    );
}
