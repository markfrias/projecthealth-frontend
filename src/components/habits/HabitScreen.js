import React, { useEffect, useState } from "react";
import {
    Container,
    ToggleButtonGroup,
    Button,
    Chip,
    Typography,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Checkbox,
    ListItemText,
    List,
    IconButton
} from "@mui/material";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { Comment, ThumbDownAltRounded, ThumbDownRounded, ThumbUpAltRounded } from "@mui/icons-material";
import { Box } from "@mui/system";
import { getHabitLogsPersonal, updateHabitJournalEntry } from "../auth/APIServices";
import moment from "moment";


export default function HabitScreen() {

    const [habits, setHabits] = useState([]);

    const [like, setView] = React.useState('like');


    const handleChange = (event, nextLike) => {
        setView(nextLike);
    };

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
            const newHabits = await getHabitLogsPersonal(moment().format('YYYY'), moment().format('MM'), moment().format('DD'));
            console.log(newHabits)
            console.log(moment().format('YYYY'), moment().format('MM'), moment().format('DD'))
            setHabits(newHabits)
        })()
    }, []);

    return (

        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <div className="header" style={{ marginLeft: 10 }}>
                <h2>Habits</h2>
                <img alt="Success" height={100} width={100} src={require("../../assets/img/success.png")} />You’ve stuck with all your habits for the past 3 days

            </div>
            <Typography component="h2">Looking for habit logs? Click here.</Typography>
            <Typography component="h2">Did I stick to my habits today?</Typography>

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
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


        </Container >

    );
}
