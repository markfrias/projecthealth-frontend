import { Chip, Grid, Typography, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { getFoodLogStreaks } from '../auth/APIServices';
import { Box } from '@mui/system';

function StaticDatePickerDemo(props) {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
                displayStaticWrapperAs="desktop"
                allowSameDateSelection
                openTo="day"
                value={props.value}
                onChange={(newValue) => {
                    props.setValue(newValue);
                    props.handleChange(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}

            />
        </LocalizationProvider>
    );
}


const Journal = () => {
    const [value, setValue] = React.useState();
    const navigate = useNavigate();

    // State for current streak
    const [currentStreak, setCurrentStreak] = React.useState();

    // Loading state
    const [loading, setLoading] = React.useState(true);

    // Chip highlighting state
    const [checked, setChecked] = useState([0]);

    // Chip options state
    const logTypes = [
        { logId: 0, label: "Food" },
        { logId: 1, label: "Habits" },

    ];

    // Chip click handler
    const handleToggle = (value) => {
        const newChecked = [];
        newChecked.push(value.logId);
        setChecked(newChecked);
    };

    // Change handler
    const handleChange = (value) => {
        const year = moment(value).format('YYYY');
        const month = moment(value).format('MM');
        const day = moment(value).format('DD');

        navigate(`/app/journal-log/${checked[0]}/${year}/${month}/${day}`)

    }

    // test value
    useEffect(() => {
        if (value !== undefined) {
            console.log(value)

        }
    }, [value])

    // Test API
    useEffect(() => {
        (async () => {
            setLoading(true);
            const streaks = await getFoodLogStreaks();
            console.log(streaks)
            // If there's no streak, assign 0
            if (streaks.length === 0) {
                // Assign 0
            }
            const latestStreak = streaks[streaks.length - 1];
            console.log(latestStreak)
            const latest = moment(latestStreak.max_date).format('YYYY-MM-DD');
            if (latest === moment().format('YYYY-MM-DD')) {
                setCurrentStreak(latestStreak.days_streak);
            }

        })()
    }, [])

    // Turn off loading state when current streak is set to the requested value from DB
    useEffect(() => {
        if (currentStreak !== undefined) {
            setLoading(false);
        }
    }, [currentStreak])

    return (
        <div>
            <Grid container direction="column">
                <Grid item container sx={{ background: "#F9AB10", height: "4rem" }}>
                    <Grid item>
                        <Typography variant="subtitle1" component="h1">Journal</Typography>
                    </Grid>
                </Grid>

                <Grid item container alignItems="center">
                    {loading ?
                        <CircularProgress variant="indeterminate" /> :

                        <Box>
                            <Grid item xs={3}>
                                <img alt="Party popper" src={require('../../assets/img/3d-confetti.png')} width="100%" height="100%" />
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant="subtitle1" component="h1">You fed Pobi for <strong>{currentStreak} {currentStreak > 1 ? "days" : "day"}</strong> straight. Log every day to increase your streak and strengthen your gotchi.</Typography>
                            </Grid>
                        </Box>
                    }

                </Grid>

                <Grid item container direction="column">
                    <Grid item xs={12}>
                        <Typography variant="subtitle1B" component="h1">Which logs are you looking for?</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {logTypes.map((log) => {
                            return (
                                <Chip key={log.logId} label={log.label} onClick={(event) => { handleToggle(log) }} variant={checked.indexOf(log.logId) !== -1 ? "filled" : "outlined"} />
                            )
                        })}
                    </Grid>
                </Grid>

                <Grid item container direction="column">
                    <Grid item xs={12}>
                        <Typography variant="subtitle1B" component="h1">Pick a date to select specific log</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <StaticDatePickerDemo value={value} setValue={setValue} handleChange={handleChange}></StaticDatePickerDemo>

                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Journal;
