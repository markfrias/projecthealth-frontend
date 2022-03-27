import { Chip, Grid, Typography, CircularProgress, FormControl, Select, InputLabel, MenuItem, Badge } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { getFoodLogStreaks, getHabitLogsOnMonth } from '../auth/APIServices';
import { Box } from '@mui/system';
import { CalendarPickerSkeleton, PickersDay } from '@mui/lab';

function StaticDatePickerDemo(props) {


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
                displayStaticWrapperAs="desktop"
                allowSameDateSelection
                openTo="day"
                loading={props.loading}
                value={props.value}
                onChange={(newValue) => {
                    props.setValue(newValue);
                    props.handleChange(newValue);
                }}
                onMonthChange={
                    props.handleMonthChange
                }
                renderInput={(params) => <TextField {...params} />}
                renderDay={(day, _value, DayComponentProps) => {
                    const isSelected =
                        !DayComponentProps.outsideCurrentMonth &&
                        props.highlightedDays.indexOf(day.getDate()) > -1;
                    console.log(props.highlightedDays.indexOf(day.getDate()) > 0)
                    console.log(`${day.getDate()} : ${props.highlightedDays}`)
                    return (
                        <Badge
                            key={day.toString()}
                            overlap="circular"
                            badgeContent={isSelected ? '🌚' : undefined}
                        >
                            <PickersDay {...DayComponentProps} sx={isSelected ? { background: 'green' } : {}} />
                        </Badge>
                    );
                }}
                renderLoading={() => <CalendarPickerSkeleton />}

            />
        </LocalizationProvider >
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

    // Select state
    const [currentHabits, setCurrentHabits] = useState();

    // Select value state
    const [selectedHabit, setSelectedHabit] = useState();

    // Logs state
    const [logs, setLogs] = useState();

    // Highlighted days state
    const [highlightedDays, setHighlightedDays] = useState([]);
    const [calendarLoading, setCalendarLoading] = useState(false);

    // Chip options state
    const logTypes = [
        { logId: 0, label: "Food" },
        { logId: 1, label: "Habits" },

    ];

    // Chip click handler
    const handleToggle = (value) => {
        setLoading(true)
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

    // Handle month change
    const handleMonthChange = async (event) => {
        setValue(event)
        console.log(event)
        if (checked[0] === 1) {
            setCalendarLoading(true);
            const year = moment(event).format('YYYY');
            const month = moment(event).format('MM');

            const logs = await getHabitLogsOnMonth(year, month);
            console.log(logs)
            setLogs(logs)
            setSelectedHabit(selectedHabit);
        }
    }

    // Change handler for select
    const handleSelectChange = (event) => {
        setLoading(true);

        setSelectedHabit(event.target.value);

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

        // Cleanup
        return () => {
            setValue();
            setCurrentStreak();
            setLoading();
            setChecked();
            setCurrentHabits();
            setSelectedHabit();
        }
    }, [])

    // Turn off loading state when current streak is set to the requested value from DB
    useEffect(() => {
        if (currentStreak !== undefined) {
            setLoading(false);
        }
    }, [currentStreak])

    // Once checked switches habits, fetch all habit logs
    useEffect(() => {
        if (checked !== undefined) {
            if (checked[0] === 1) {
                setCalendarLoading(true);
                (async () => {
                    const year = moment().format('YYYY');
                    const month = moment().format('MM');

                    const logs = await getHabitLogsOnMonth(year, month);
                    setLogs(logs);
                    console.log(logs)

                    let uniqueObjArray = [...new Map(logs.map((item) => [item["habitId"], item])).values()];
                    setCurrentHabits(uniqueObjArray);
                    setSelectedHabit(uniqueObjArray[0].habitId)

                })()
            } else {
                setHighlightedDays([])

                setLoading(false)
            }
        }

    }, [checked])

    // Turn off loading state when habits have been loaded
    useEffect(() => {
        if (currentHabits !== undefined) {
            setLoading(false);

        }
    }, [currentHabits])

    // Change calendar day render on change of select value
    useEffect(() => {
        if (selectedHabit !== undefined) {
            console.log(selectedHabit)
            const newHabits = logs.filter((habit) => habit.habitId === selectedHabit);
            console.log(newHabits)
            const filteredArray = newHabits.filter((habit) => habit.habitAccomplished === 1)
            console.log(filteredArray)
            const days = filteredArray.map((habit) => {
                return parseInt(moment(habit.habitEntryDate).format('DD'));
            })
            console.log(days)

            setHighlightedDays(days)

        }
        // Solve this useEffect problem
        // eslint-disable-next-line
    }, [selectedHabit]);

    // Change highlighted days on logs state changing
    useEffect(() => {
        if (logs !== undefined) {
            const newHabits = logs.filter((habit) => habit.habitId === selectedHabit);
            console.log(newHabits)
            const filteredArray = newHabits.filter((habit) => habit.habitAccomplished === 1)
            console.log(filteredArray)
            const days = filteredArray.map((habit) => {
                return parseInt(moment(habit.habitEntryDate).format('DD'));
            })
            console.log(days)
            setHighlightedDays(days)

        }
        // Solve this useEffect problem
        // eslint-disable-next-line
    }, [logs]);


    useEffect(() => {
        if (highlightedDays !== undefined) {
            console.log(highlightedDays)

            setCalendarLoading(false)
            setLoading(false)
        }
    }, [highlightedDays])

    return (

        <div>
            <Grid container direction="column">
                <Grid item container sx={{ background: "#F9AB10", height: "4rem" }}>
                    <Grid item>
                        <Typography variant="subtitle1" component="h1">Journal</Typography>
                    </Grid>
                </Grid>

                {loading ?
                    <CircularProgress variant="indeterminate" /> :
                    <div>
                        <Grid item container alignItems="center">
                            {loading ?
                                <CircularProgress variant="indeterminate" /> :

                                <Box>
                                    {checked[0] === 1 ?
                                        <Typography component="p">You can view your individual habit streaks by selecting the specific date, then, selecting the specific habit.</Typography> :
                                        <Box>
                                            <Grid item xs={3}>
                                                <img alt="Party popper" src={require('../../assets/img/3d-confetti.png')} width="100%" height="100%" />
                                            </Grid>
                                            <Grid item xs={9}>
                                                <Typography variant="subtitle1" component="h1">You fed Pobi for <strong>{currentStreak} {currentStreak > 1 ? "days" : "day"}</strong> straight. Log every day to increase your streak and strengthen your gotchi.</Typography>
                                            </Grid>
                                        </Box>

                                    }

                                </Box>
                            }

                        </Grid>

                        {checked[0] === 1 ?
                            <Grid item container direction="column">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedHabit}
                                        label="Select a habit"
                                        onChange={handleSelectChange}
                                    >
                                        {currentHabits.map((habit) => {
                                            return <MenuItem key={habit.habitId} value={habit.habitId}>{habit.habitName}</MenuItem>
                                        })}

                                    </Select>
                                </FormControl>
                            </Grid> : ""
                        }


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
                                <StaticDatePickerDemo handleMonthChange={handleMonthChange} loading={calendarLoading} highlightedDays={highlightedDays} value={value} setValue={setValue} handleChange={handleChange}></StaticDatePickerDemo>

                            </Grid>
                        </Grid>
                    </div>

                }

            </Grid>
        </div>
    );
}

export default Journal;
