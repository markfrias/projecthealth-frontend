import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Container, Checkbox, Button, List, Alert, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, IconButton, Grid, Typography } from '@mui/material';
import { getHabitAutocomplete } from '../auth/APIServices';
import { AddRounded, Close, Delete } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from 'victory';


export default function HabitsOnboarding4(props) {
    const navigate = useNavigate();
    const sampleHabits = [
        {
            habitId: 1,
            habitName: "Drink 3 glasses of water in the morning",
            goalId: 2
        },
        {
            habitId: 2,
            habitName: "Walk at least 30 minutes a day",
            goalId: 3
        },
        {
            habitId: 3,
            habitName: "Don't eat fast food for at least two meals a day",
            goalId: 3
        }

    ]

    // Test state
    /*
    React.useEffect(() => {
        console.log(props.habitsState.goalCategoryInputValue)
        if (props.habitsState.goalCategoryInputValue === "") {
            return;
        }
        getHabitAutocomplete(props.habitsState.goalCategoryInputValue).then(data => props.setHabitsDef(data));

    }, [props]);
    */

    return (
        <Container maxWidth="md" sx={{
            display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", paddingX: "2em", paddingY: '2em'
        }}>
            <Grid>
                <Grid item container direction="column" className="header" mb="4em">
                    <Button variant='text' sx={{ color: 'black', padding: '0', mb: '.5em', alignSelf: 'flex-start' }} startIcon={<Close />} component={Link} to="/app/habits/2">Select habits</Button>

                    <Typography variant="subtitle1" component="h2">Select or search habits that you want to pursue from the list.</Typography>
                </Grid>

                <Grid item mb={3}>
                    <Autocomplete
                        disablePortal
                        freeSolo
                        sx={{ width: '100%' }}
                        id="combo-box-demo"
                        options={props.habitsDef}
                        getOptionLabel={(option) => option.habitName}
                        value={props.habitAuto}
                        onChange={(event, newValue) => {
                            props.setHabitsAuto(newValue);

                        }}
                        inputValue={props.habitsState.goalCategoryInputValue}
                        onInputChange={(event, newInputValue) => {
                            props.setHabitsState({
                                ...props.habitsState,
                                goalCategoryInputValue: newInputValue
                            });

                            if (props.habitsState.goalCategoryInputValue === "") {
                                return;
                            }
                            getHabitAutocomplete(props.habitsState.goalCategoryInputValue).then(data => props.setHabitsDef(data));
                        }}
                        renderInput={(params) => <TextField {...params} label="Search for habits" fullWidth />}
                        filterOptions={(x) => x}
                    />
                </Grid>

                <Grid item container direction="column" sx={{ mb: 3 }}>
                    {/* Show only if the user hasn't searched anything */
                        props.habitsState.goalCategoryInputValue === "" ?
                            <Grid item container direction="column">
                                <Typography variant='onboardingHeader2' component='h2' sx={{ mb: 1 }} >Suggested Habits</Typography>
                                <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    {sampleHabits.length <= 0 ?
                                        <Alert severity="info">Please create or select a habit.</Alert> :

                                        sampleHabits.map((value) => {
                                            const labelId = `checkbox-list-secondary-label-${value.habitName}`;
                                            return (
                                                <ListItem
                                                    key={`${value.habitId}${Math.random()}`}
                                                    secondaryAction={
                                                        <Checkbox
                                                            edge="end"
                                                            onChange={(event) => {
                                                                props.handleToggle(value);

                                                                if (props.checked.indexOf(value.habitId) === -1) {
                                                                    props.setHabitsToAdd([
                                                                        ...props.habitsToAdd,
                                                                        value
                                                                    ])
                                                                } else {
                                                                    const habitIndex = props.habitsToAdd.indexOf(value);
                                                                    let habitsToAddCopy = props.habitsToAdd;
                                                                    habitsToAddCopy.splice(habitIndex, 1)
                                                                    props.setHabitsToAdd([
                                                                        ...habitsToAddCopy
                                                                    ])
                                                                }

                                                            }}
                                                            checked={props.checked.indexOf(value.habitId) !== -1}
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                        />
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
                            </Grid> :
                            <Grid item container direction="column">
                                <Typography variant='onboardingHeader2' component='h2' sx={{ mb: 1 }}> Results</Typography>
                                <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                    {props.habitsDef.length <= 0 ?
                                        <Alert severity="info">Please create or select a habit.</Alert> :

                                        props.habitsDef.map((value) => {
                                            const labelId = `checkbox-list-secondary-label-${value.habitName}`;
                                            return (
                                                <ListItem
                                                    key={`${value.habitId}${Math.random()}`}
                                                    secondaryAction={
                                                        <ListItemButton>
                                                            <AddRounded
                                                                onClick={(event) => {
                                                                    props.handleResultsToggle(value);
                                                                    if (props.resultsChecked.indexOf(value.habitId) === -1) {
                                                                        props.setHabitsToAdd([
                                                                            ...props.habitsToAdd,
                                                                            value
                                                                        ])
                                                                    } else {
                                                                        const habitIndex = props.habitsToAdd.indexOf(value);
                                                                        let habitsToAddCopy = props.habitsToAdd;
                                                                        habitsToAddCopy.splice(habitIndex, 1)
                                                                        props.setHabitsToAdd([
                                                                            ...habitsToAddCopy
                                                                        ])
                                                                    }
                                                                }}
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
                            </Grid>




                    }
                </Grid>
            </Grid>






            <Grid item container direction="column">
                <Typography variant='onboardingHeader2' component='h2' sx={{ mb: 1 }} >Habits selected</Typography>
                <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {props.habitsToAdd.length <= 0 ?
                        <Alert severity="info">Please create or select a habit.</Alert> :

                        props.habitsToAdd.map((value) => {
                            const labelId = `checkbox-list-secondary-label-${value.habitName}`;
                            return (
                                <ListItem
                                    key={`${value.habitId}${Math.random()}`}
                                    secondaryAction={

                                        <IconButton edge="end" aria-label="delete" onClick={
                                            (event) => {
                                                props.handleHabitsToAddToggle(value);
                                                const habitIndex = props.habitsToAdd.indexOf(value);
                                                let habitsToAddCopy = props.habitsToAdd;
                                                habitsToAddCopy.splice(habitIndex, 1)
                                                props.setHabitsToAdd([
                                                    ...habitsToAddCopy
                                                ]);
                                            }
                                        }>
                                            <Delete />
                                        </IconButton>
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
            </Grid>



            <div style={{ marginBottom: 20, position: 'fixed', bottom: 0, width: '100%', padding: '0 2em' }}>
                <Button variant="contained" fullWidth onClick={() => {
                    const newArray = props.habitsState.habitsForSubmission;
                    props.habitsToAdd.forEach((value) => {
                        newArray.push(value);
                    })
                    console.log(newArray)
                    props.setHabitsState({
                        ...props.habitsState,
                        habitsForSubmission: newArray
                    });
                    navigate("/app/habits/2");

                }}> Add habits</Button>

            </div>
        </Container >
    );
}
