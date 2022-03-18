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

function CircularStatic(props) {
  const progress = props.numerator / props.denominator * 100;

  return <CircularProgressWithLabel value={progress} color={progress <= 100 ? 'primary' : 'red'} />;
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

  // Recommended values
  const recommendedCarbs = 300;
  const recommendedFat = 65;
  const recommendedProtein = 50;

  // State for this page's data (food logs)
  const [foodLogs, setFoodLogs] = useState();

  // State for summary values like total carbs
  const [summaryValues, setSummaryValues] = useState();

  // State for calorie budget
  const [calorieBudget, setCalorieBudget] = useState();

  // State to enable loading UI elements
  const [loading, setLoading] = useState(true);

  // Segregated meal logs for each mealType
  const [breakfastLog, setBreakfastLog] = useState([]);
  const [lunchLog, setLunchLog] = useState([]);
  const [dinnerLog, setDinnerLog] = useState([]);
  const [snackLog, setSnackLog] = useState([]);


  // Fetch and set data for food log breakdown
  useEffect(() => {
    console.log(year);
    console.log(month);
    console.log(day);
    (async () => {
      const response = await getFoodLogsPersonal(year, month, day);
      console.log(`${year} ${month} ${day}`)
      console.log(response);
      setFoodLogs(response[0]);

      // Set calorie budget state
      console.log(response[1][0].calorieBudget)
      setCalorieBudget(response[1][0].calorieBudget);

      // Set categorized meal states
      const breakfast = response[0].filter((value) => value.mealType === "breakfast");
      const lunch = response[0].filter((value) => value.mealType === "lunch");
      const dinner = response[0].filter((value) => value.mealType === "dinner");
      const snack = response[0].filter((value) => value.mealType === "snack");

      setBreakfastLog(breakfast);
      setLunchLog(lunch);
      setDinnerLog(dinner);
      setSnackLog(snack);


    })()
  }, []);

  // Test food log state
  useEffect(() => {
    // Assign summary values once foodLogs is defined
    if (foodLogs !== undefined) {
      // Calculate all calories, carbs, protein, fat, and sodium from those meals and set to state, subtract with calorie budget and save as calorie budget
      const calorieTotalFromLogs = foodLogs.reduce((prev, current) => {
        return prev + current.caloriesPerUnit * current.servingQty;
      }, 0);

      const carbsTotalFromLogs = foodLogs.reduce((prev, current) => {
        return prev + current.carbs;
      }, 0);

      const proteinTotalFromLogs = foodLogs.reduce((prev, current) => {
        return prev + current.protein;
      }, 0);

      const fatTotalFromLogs = foodLogs.reduce((prev, current) => {
        return prev + current.fat;
      }, 0);

      const sodiumTotalFromLogs = foodLogs.reduce((prev, current) => {
        return prev + current.sodium;
      }, 0);

      console.log(calorieTotalFromLogs);

      setSummaryValues({
        calories: calorieTotalFromLogs,
        carbs: carbsTotalFromLogs,
        protein: proteinTotalFromLogs,
        fat: fatTotalFromLogs,
      })

    }
  }, [foodLogs, calorieBudget, breakfastLog, lunchLog, dinnerLog, snackLog]);

  // Turn off loading state once summary values is defined
  useEffect(() => {
    // If summary values is not undefined, turn off loading state
    if (summaryValues !== undefined) {
      setLoading(false);
    }
  }, [summaryValues, breakfastLog, lunchLog, dinnerLog, snackLog])


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
                <CircularStatic numerator={summaryValues.calories} denominator={calorieBudget}></CircularStatic>
                <Typography variant='subtitle1' component='p'>{(summaryValues.calories / calorieBudget * 100) < 100 ? 'You are still on track to reach your calorie target for today.' :
                  `You exceeded your calorie budget by ${calorieBudget - summaryValues.calories} calories.`
                }</Typography>
              </Grid>
            </Grid>

            <Grid item container alignItems="center">
              <Grid item xs={9}>
                <CircularStatic numerator={summaryValues.carbs} denominator={recommendedCarbs}></CircularStatic>
                <Typography variant='subtitle1B' component='p'>Carbs</Typography>
              </Grid>
            </Grid>

            <Grid item container alignItems="center">
              <Grid item xs={9}>
                <CircularStatic numerator={summaryValues.fat} denominator={recommendedFat}></CircularStatic>
                <Typography variant='subtitle1B' component='p'>Fat</Typography>
              </Grid>
            </Grid>

            <Grid item container alignItems="center">
              <Grid item xs={9}>
                <CircularStatic numerator={summaryValues.protein} denominator={recommendedProtein}></CircularStatic>
                <Typography variant='subtitle1B' component='p'>Protein</Typography>
              </Grid>
            </Grid>

            <Grid item container alignItems="center">
              <Grid item xs={9}>
                <Typography variant='subtitle1B' component='h1' >Breakfast</Typography>
                {breakfastLog.length > 0 ?
                  <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {breakfastLog.map((value) => (
                      <ListItem
                        key={value.foodJournalId}
                        disableGutters
                        secondaryAction={
                          <IconButton>
                            <ReorderIcon />
                          </IconButton>
                        }
                      >
                        {value.diaryType === "detailed" ?
                          <ListItemText primary={toTitleCase(value.foodName)} secondary={`${value.servingQty} ${value.servingUnit.toLowerCase()}${value.servingQty > 0 ? 's' : ''}    |    ${value.caloriesPerUnit * value.servingQty} calories`} />
                          :
                          <ListItemText primary={toTitleCase(value.foodName)} secondary={value.servingDescription} />
                        }
                      </ListItem>
                    ))}
                  </List>
                  :
                  <Typography variant="p" component="p">You might not have eaten breakfast on this day.</Typography>
                }

                <Typography variant='subtitle1B' component='h1' >Lunch</Typography>
                {lunchLog.length > 0 ?
                  <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {lunchLog.map((value) => (
                      <ListItem
                        key={value.foodJournalId}
                        disableGutters
                        secondaryAction={
                          <IconButton>
                            <ReorderIcon />
                          </IconButton>
                        }
                      >
                        {value.diaryType === "detailed" ?
                          <ListItemText primary={toTitleCase(value.foodName)} secondary={`${value.servingQty} ${value.servingUnit.toLowerCase()}${value.servingQty > 0 ? 's' : ''}    |    ${value.caloriesPerUnit * value.servingQty} calories`} />
                          :
                          <ListItemText primary={toTitleCase(value.foodName)} secondary={value.servingDescription} />
                        }
                      </ListItem>
                    ))}
                  </List>
                  :
                  <Typography variant="p" component="p">You might not have eaten breakfast on this day.</Typography>
                }

                <Typography variant='subtitle1B' component='h1' >Dinner</Typography>
                {dinnerLog.length > 0 ?
                  <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {dinnerLog.map((value) => (
                      <ListItem
                        key={value.foodJournalId}
                        disableGutters
                        secondaryAction={
                          <IconButton>
                            <ReorderIcon />
                          </IconButton>
                        }
                      >
                        {value.diaryType === "detailed" ?
                          <ListItemText primary={toTitleCase(value.foodName)} secondary={`${value.servingQty} ${value.servingUnit.toLowerCase()}${value.servingQty > 0 ? 's' : ''}    |    ${value.caloriesPerUnit * value.servingQty} calories`} />
                          :
                          <ListItemText primary={toTitleCase(value.foodName)} secondary={value.servingDescription} />
                        }
                      </ListItem>
                    ))}
                  </List>
                  :
                  <Typography variant="p" component="p">You might not have eaten breakfast on this day.</Typography>
                }

                <Typography variant='subtitle1B' component='h1' >Snacks</Typography>
                {snackLog.length > 0 ?
                  <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {snackLog.map((value) => (
                      <ListItem
                        key={value.foodJournalId}
                        disableGutters
                        secondaryAction={
                          <IconButton>
                            <ReorderIcon />
                          </IconButton>
                        }
                      >
                        {value.diaryType === "detailed" ?
                          <ListItemText primary={toTitleCase(value.foodName)} secondary={`${value.servingQty} ${value.servingUnit.toLowerCase()}${value.servingQty > 0 ? 's' : ''}    |    ${value.caloriesPerUnit * value.servingQty} calories`} />
                          :
                          <ListItemText primary={toTitleCase(value.foodName)} secondary={value.servingDescription} />
                        }
                      </ListItem>
                    ))}
                  </List>
                  :
                  <Typography variant="p" component="p">You might not have eaten breakfast on this day.</Typography>
                }



              </Grid>
            </Grid>
          </Box>
        }





      </Grid>
    </div>
  );
}

export default DateJournal;
