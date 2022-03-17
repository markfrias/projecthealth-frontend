import { Chip, Grid, Typography } from '@mui/material';
import React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';

function StaticDatePickerDemo() {
    const [value, setValue] = React.useState(new Date());
  
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          openTo="year"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  }


const Journal = () => {
    return (
        <div>
            <Grid container direction="column">
                <Grid item container sx={{ background: "#F9AB10", height: "4rem" }}>
                    <Grid item>
                        <Typography variant="subtitle1" component="h1">Journal</Typography>
                    </Grid>
                </Grid>

                <Grid item container alignItems="center">
                    <Grid item xs={3}>
                        <img alt="Party popper" src={require('../../assets/img/3d-confetti.png')} width="100%" height="100%" />
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="subtitle1" component="h1">You fed Pobi for 3 days straight. You unlocked a new object.</Typography>
                    </Grid>
                </Grid>

                <Grid item container direction="column">
                    <Grid item xs={12}>
                        <Typography variant="subtitle1B" component="h1">Which logs are you looking for?</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Chip label="Food" />
                        <Chip label="Sleep" />
                        <Chip label="Habit" />
                        <Chip label="Exercise" />
                        <Chip label="Missions" />
                        <Chip label="Challenges" />
                        <Chip label="Water" />
                    </Grid>
                </Grid>

                <Grid item container direction="column">
                    <Grid item xs={12}>
                        <Typography variant="subtitle1B" component="h1">Pick a date to select specific log</Typography>
                    </Grid>

                    <Grid item xs={12}>
                    <StaticDatePickerDemo></StaticDatePickerDemo>

                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Journal;
