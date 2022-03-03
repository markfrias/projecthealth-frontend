import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Container, FormGroup, FormControlLabel, Checkbox, Button, List, Alert, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText } from '@mui/material';

const filter = createFilterOptions();

export default function HabitsOnboarding4(props) {
    const [value, setValue] = React.useState(null);
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

    return (
        <Container maxWidth="md" sx={{
            display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", height: "100vh"
        }}>
            <div className="header" style={{ marginLeft: 10 }}>

                <p>Select or search habits that you want to pursue from the list.</p>

            </div>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        setValue({
                            title: newValue,
                        });
                    } else if (newValue && newValue.inputValue) {
                        // Create a new value from the user input
                        setValue({
                            title: newValue.inputValue,
                        });
                    } else {
                        setValue(newValue);
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option.title);
                    if (inputValue !== '' && !isExisting) {
                        filtered.push({
                            inputValue,
                            title: `Add "${inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={habits}
                getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    // Regular option
                    return option.title;
                }}
                renderOption={(props, option) => <li {...props}>{option.title}</li>}
                sx={{ width: 380 }}
                freeSolo
                renderInput={(params) => (
                    <TextField {...params} label="Search for a habit" />
                )}
            />
            <div>
                <h2 style={{ fontSize: 18, marginLeft: 10 }}>Suggested Habits</h2>
            </div>
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
                                        onChange={(event) => { props.handleToggle(value) }}
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
                                    <ListItemText id={labelId} primary={`Line item ${value + 1}`} secondary="Goal A" />
                                </ListItemButton>
                            </ListItem>
                        );
                    })


                }

            </List>
            <div className="button-class" style={{ marginBottom: 20 }}>
                <Button className="button-full" variant="contained"> Add habits</Button>

            </div>
        </Container>
    );
}
const habits = [
    { title: 'Brush teeth thrice a day' },

];