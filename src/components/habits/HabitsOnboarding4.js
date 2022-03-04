import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Container, FormGroup, FormControlLabel, Checkbox, Button, List, Alert, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, popoverClasses } from '@mui/material';
import { Box } from '@mui/system';
import { getHabitAutocomplete } from '../auth/APIServices';

const filter = createFilterOptions();

export default function HabitsOnboarding4(props) {
    const [value, setValue] = React.useState(null);
    const [isSearched, setIsSearched] = React.useState(false);
    const sampleHabits = [
        {
            habitId: 7,
            habitName: "Drink 3 glasses of water in the morning",
            goalId: 2
        },
        {
            habitId: 8,
            habitName: "Walk at least 30 minutes a day",
            goalId: 3
        },
        {
            habitId: 9,
            habitName: "Don't eat fast food for at least two meals a day",
            goalId: 3
        }

    ]

    // Test state
    React.useEffect(() => {
        console.log(props.habitsState.goalCategoryInputValue)
        if (props.habitsState.goalCategoryInputValue === "") {
            return;
        }
        getHabitAutocomplete(props.habitsState.goalCategoryInputValue).then(data => props.setHabitsDef(data));

    }, [props.habitsState.goalCategoryInputValue]);

    return (
        <Container maxWidth="md" sx={{
            display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", height: "100vh"
        }}>
            <div className="header" style={{ marginLeft: 10 }}>

                <p>Select or search habits that you want to pursue from the list.</p>

            </div>
            <Autocomplete
                disablePortal
                freeSolo
                sx={{ width: '100%' }}
                id="combo-box-demo"
                options={props.habitsDef}
                getOptionLabel={(option) => option.habitName}
                value={props.habitAuto}
                onChange={(event, newValue) => {
                    props.setHabitsAuto(newValue)
                }}
                inputValue={props.habitsState.goalCategoryInputValue}
                onInputChange={(event, newInputValue) => {
                    props.setHabitsState({
                        ...props.habitsState,
                        goalCategoryInputValue: newInputValue
                    });

                }}
                onBlur={(event) => { setIsSearched(true) }}
                renderInput={(params) => <TextField {...params} label="Search for habits" fullWidth />}
                filterOptions={(x) => x}
            />

            {/* Show only if the user hasn't searched anything */
                props.habitsState.goalCategoryInputValue === "" ?
                    <div>
                        <h2 style={{ fontSize: 18, marginLeft: 10 }}>Suggested Habits</h2>
                        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {sampleHabits.length <= 0 ?
                                <Alert severity="info">Please create or select a habit.</Alert> :

                                sampleHabits.map((value) => {
                                    const labelId = `checkbox-list-secondary-label-${value.habitName}`;
                                    return (
                                        <ListItem
                                            key={value.habitId}
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
                    </div> :
                    <div>
                        <h2 style={{ fontSize: 18, marginLeft: 10 }}>Results</h2>
                        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {sampleHabits.length <= 0 ?
                                <Alert severity="info">Please create or select a habit.</Alert> :

                                props.habitsDef.map((value) => {
                                    const labelId = `checkbox-list-secondary-label-${value.habitName}`;
                                    return (
                                        <ListItem
                                            key={value.habitId}
                                            secondaryAction={
                                                <Checkbox
                                                    edge="end"
                                                    onChange={(event) => {
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
                                                    checked={props.resultsChecked.indexOf(value.habitId) !== -1}
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
                    </div>
            }


            <div>
                <h2 style={{ fontSize: 18, marginLeft: 10 }}>Habits Selected</h2>
                <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {props.habitsToAdd.length <= 0 ?
                        <Alert severity="info">Please create or select a habit.</Alert> :

                        props.habitsToAdd.map((value) => {
                            const labelId = `checkbox-list-secondary-label-${value.habitName}`;
                            return (
                                <ListItem
                                    key={value.habitId}
                                    secondaryAction={
                                        <Checkbox
                                            edge="end"
                                            onChange={(event) => {
                                                //props.handleHabitsToAddToggle(value);
                                                const habitIndex = props.habitsToAdd.indexOf(value);
                                                let habitsToAddCopy = props.habitsToAdd;
                                                habitsToAddCopy.splice(habitIndex, 1)
                                                props.setHabitsToAdd([
                                                    ...habitsToAddCopy
                                                ]);

                                                /*if (props.habitsChecked.indexOf(value.habitId) === -1) {
                                                    props.setHabitsToAdd([
                                                        ...props.habitsToAdd,
                                                        value
                                                    ]);
                                                }*/

                                            }}
                                            checked={true}
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
            </div>

            <div className="button-class" style={{ marginBottom: 20 }}>
                <Button className="button-full" variant="contained"> Add habits</Button>

            </div>
        </Container>
    );
}
const habits = [
    { title: 'Brush teeth thrice a day' },

];