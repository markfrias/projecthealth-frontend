import { Reorder, ThumbUpRounded } from '@mui/icons-material';
import { Box, CircularProgress, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getHabitLogsPersonal, getHabitsLogPersonal } from '../auth/APIServices';
import toTitleCase from '../auth/StringServices';

const
    HabitJournalLog = (props) => {
        // Url params
        const { category, year, month, day } = props.params;

        // State for this page's data (food logs)
        const [habitLogs, setHabitLogs] = useState();

        // State to enable loading UI elements
        const [loading, setLoading] = useState(true);

        // Fetch and set data for food log breakdown
        useEffect(() => {
            setLoading(true);
            (async () => {
                const response = await getHabitLogsPersonal(year, month, day);
                console.log(`${year} ${month} ${day}`)
                console.log(response);
                setHabitLogs(response);
            })()
            // Fix this useEffect problem
            // eslint-disable-next-line
        }, [props.params]);

        // Test food log state
        useEffect(() => {
            if (habitLogs !== undefined) {
                setLoading(false);
            }
        }, [habitLogs]);

        return (
            loading ?
                <Grid container direction="column">
                    <Grid item container direction="column" md={12} justifyContent="center" alignItems="center" sx={{ width: '100%', minHeight: '80vh' }}>
                        <Grid item>
                            <CircularProgress variant='indeterminate' md={12} />
                        </Grid>
                        <Grid item md={12}>
                            <Typography variant="p" component="p" sx={{ textAlign: 'center' }}>Loading your logs...</Typography>
                        </Grid>
                    </Grid>
                </Grid> :
                <Grid container direction="column">

                    <Grid item container alignItems="center">
                        <Grid item xs={9}>
                            <Typography variant='subtitle1B' component='h1' >Habits tracked</Typography>
                            {habitLogs.length > 0 ?
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    {habitLogs.map((value) => (
                                        <ListItem
                                            key={value.habitEntryId}
                                        >


                                            <ListItemText primary={value.habitName} secondary={value.goalName} />


                                        </ListItem>
                                    ))}
                                </List>
                                :
                                <Typography variant="p" component="p">You might not have eaten breakfast on this day.</Typography>
                            }





                        </Grid>
                    </Grid>
                </Grid>
        );
    }

export default HabitJournalLog;
