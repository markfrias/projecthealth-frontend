import { Chip, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import DatePicker from '@mui/lab/DatePicker';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ReorderIcon from '@mui/icons-material/Reorder';
import { useParams, useSearchParams } from 'react-router-dom';
import { getFoodLogsPersonal } from '../auth/APIServices';
import toTitleCase from '../auth/StringServices';


function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

function CircularStatic() {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={progress} />;
}

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

const DateJournal = () => {
  const params = useParams();
  const { year, month, day } = params;

  // State for this page's data (food logs)
  const [foodLogs, setFoodLogs] = useState();

  // State to enable loading UI elements
  const [loading, setLoading] = useState(true);

  // Fetch and set data for food log breakdown
  useEffect(() => {
    console.log(year);
    console.log(month);
    console.log(day);
    (async () => {
      const response = await getFoodLogsPersonal(year, month, day);
      console.log(`${year} ${month} ${day}`)
      console.log(response);
      setFoodLogs(response);
    })()
  }, []);

  // Turns off loading state if foodLogs is loaded already
  useEffect(() => {
    // If food logs is not undefined, turn off loading state
    if (foodLogs !== undefined) {
      setLoading(false);
    }
    console.log(foodLogs)
  }, [foodLogs])


  return (
    <div>
      <Grid container direction="column">
        <Grid item container sx={{ background: "#F9AB10", height: "4rem" }}>
          <Grid item>
            <Typography variant="subtitle1B" component="h1">Journal</Typography>
          </Grid>
        </Grid>


        {/* Load other page parts only when data has been loaded */}

        {loading ?
          <Grid item container direction="column" md={12} justifyContent="center" alignItems="center" sx={{ width: '100%', minHeight: '80vh' }}>
            <Grid item>
              <CircularProgress variant='indeterminate' md={12} />
            </Grid>
            <Grid item md={12}>
              <Typography variant="p" component="p" sx={{ textAlign: 'center' }}>Loading your logs...</Typography>
            </Grid>
          </Grid>
          :
          <Box>
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
                <CircularStatic></CircularStatic>
                <Typography variant='subtitle1' component='p'>You overate on this day by 12% more than your budget</Typography>
              </Grid>
            </Grid>

            <Grid item container alignItems="center">
              <Grid item xs={9}>
                <CircularStatic></CircularStatic>
                <Typography variant='subtitle1B' component='p'>Carbs</Typography>
              </Grid>
            </Grid>

            <Grid item container alignItems="center">
              <Grid item xs={9}>
                <CircularStatic></CircularStatic>
                <Typography variant='subtitle1B' component='p'>Fat</Typography>
              </Grid>
            </Grid>

            <Grid item container alignItems="center">
              <Grid item xs={9}>
                <CircularStatic></CircularStatic>
                <Typography variant='subtitle1B' component='p'>Protein</Typography>
              </Grid>
            </Grid>

            <Grid item container alignItems="center">
              <Grid item xs={9}>
                <Typography variant='subtitle1B' component='h1' >Breakfast</Typography>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  {foodLogs.map((value) => (
                    <ListItem
                      key={value.foodJournalId}
                      disableGutters
                      secondaryAction={
                        <IconButton>
                          <ReorderIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText primary={toTitleCase(value.foodName)} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Box>
        }





      </Grid>
    </div>
  );
}

export default DateJournal;
