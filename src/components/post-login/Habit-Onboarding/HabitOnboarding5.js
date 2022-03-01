import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Container, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';

const filter = createFilterOptions();

export default function HabitOnboarding5() {
    const [value, setValue] = React.useState(null);

    return (
        <Container maxWidth="md" sx={"display: flex; flex-direction: column; justify-content: space-between; min-height: 100vh"}>
            <div className="header" style={{ marginLeft: 10, marginTop:15}}>

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
          
                
           
            <FormGroup style={{ marginBottom: 300, marginLeft: 10 }}>
                <h2 style={{ fontSize: 18}}>Results</h2>
                <FormControlLabel control={<Checkbox />} label="Brush teeth thrice a day" />
            
            </FormGroup>
            <div className="button-class" style={{ marginBottom: 20 }}>
                <Button className="button-full" variant="contained"> Save habits</Button>

            </div>
        </Container>
    );
}
const habits = [
    { title: 'Brush teeth thrice a day' },

];
