import { Chip, Grid, Typography } from '@mui/material';
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ReorderIcon from '@mui/icons-material/Reorder';
import Stack from '@mui/material/Stack';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';

function ViewsDatePicker() {
    const [value, setValue] = React.useState(new Date());
  
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>

          <DatePicker
            views={['day']}
            label="Just date"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} helperText={null} />}
          />
        </Stack>
      </LocalizationProvider>
    );
  }


const DateHabit = () => {
    return (
        <div>
            <Grid container direction="column">
                <Grid item container sx={{ background: "#F9AB10", height: "4rem" }}>
                    <Grid item>
                        <Typography variant="subtitle1B" component="h1">Journal</Typography>
                    </Grid>
                </Grid>



                <Grid item container direction="column">
                    <Grid item xs={12}>
                        <ViewsDatePicker></ViewsDatePicker>
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



                <Grid item container alignItems="center">
                    <Grid item xs={9}>
                        <Typography variant='subtitle1B' component='h1' >Habits tracked</Typography>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {[1, 2, 3].map((value) => (
                         <ListItem
                        key={value}
                        disableGutters
                        secondaryAction={
                        <IconButton>
                        <ReorderIcon />
                        </IconButton>
                 }
            >
              <ListItemText primary={`Line item ${value}`} />
            </ListItem>
          ))}
        </List>
                    </Grid>
                </Grid>

            </Grid>
        </div>
    );
}

export default DateHabit;
