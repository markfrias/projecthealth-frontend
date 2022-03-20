import { ThumbDownRounded, ThumbUpRounded } from '@mui/icons-material';
import { CircularProgress, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getHabitLogsPersonal } from '../auth/APIServices';
import { Link } from 'react-router-dom';

const
    HabitJournalLog = (props) => {
        // Url params
        const { year, month, day } = props.params;

        // State for this page's data (food logs)
        const [habitLogs, setHabitLogs] = useState();

        // State to enable loading UI elements
        const [loading, setLoading] = useState(true);

        // Cleanup
        useEffect(() => {
            return () => {
                setHabitLogs();
                setLoading();
            }
        }, [])

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

                    <Grid item container alignItems="center" justifyContent={'center'}>
                        <Grid item xs={12}>
                            <Typography variant='subtitle1B' component='h1' >Habits tracked</Typography>
                            {habitLogs.length > 0 ?
                                <List sx={{ width: '100%', maxWidth: '50em', bgcolor: '#fdf8ec' }}>
                                    {habitLogs.map((value) => (
                                        <ListItem
                                            key={value.habitEntryId}
                                        >


                                            <ListItemText primary={value.habitName} secondary={value.goalName} />

                                            {/* Change color depending on habit status */}

                                            {value.habitAccomplished ?
                                                <ListItemIcon>
                                                    <ThumbUpRounded color="green" />
                                                </ListItemIcon> :
                                                <ListItemIcon>
                                                    <ThumbDownRounded color="red" />
                                                </ListItemIcon>
                                            }

                                        </ListItem>
                                    ))}
                                </List>
                                :
                                <Typography variant="p" component="p">Arf. You seem to have not tracked any habit for this day. <Link to="/app/habits/1">Track habits</Link> to satisfy your gotchi.</Typography>
                            }





                        </Grid>
                    </Grid>
                </Grid>
        );
    }

export default HabitJournalLog;
