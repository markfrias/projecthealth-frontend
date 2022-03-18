import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Box, Backdrop, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, LinearProgress, MenuItem, Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Typography from '@mui/material/Typography';
import { Navigate, useNavigate } from 'react-router-dom';
import { getCalorieBudget, getFoodLogsPersonal, getNutrients, getTodayUserNutrients, saveDetailedFoodLog } from '../auth/APIServices';
import moment from 'moment';



const LogScreen = (props) => {

  // Recommended values
  const recommendedCarbs = 300;
  const recommendedFat = 65;
  const recommendedProtein = 50;

  const [open, setOpen] = useState(false);
  const [modalHeading, setModalHeading] = useState("");
  const [modalBody, setModalBody] = useState("");

  const handleDialogClose = () => {
    setOpen(false);

  }

  const navigate = useNavigate();
  const mealTypes = [
    { mealId: 1, label: "Breakfast" },
    { mealId: 2, label: "Lunch" },
    { mealId: 3, label: "Dinner" },
    { mealId: 4, label: "Snack" }
  ];

  const initialState = {
    servingQty: 1,
    foodName: "",
    servingDescription: "",
    photosUrl: "",
    mealType: "",
    baseCalories: "",
    servingUnit: "",
    totalWeight: ""
  }

  const [checked, setChecked] = useState([0]);
  const [quickNoteState, setQuickNoteState] = useState(initialState);
  const [nutrients, setNutrients] = useState({

  });
  const [remainingBudgets, setRemainingBudgets] = useState();
  const [measureItem, setMeasureItem] = useState();
  const [loading, setLoading] = useState(false);
  const [nutrientContext, setNutrientContext] = useState({
    sumCarbs: null,
    sumProtein: null,
    sumFat: null,
    sumSodium: null,
    calorieBudget: null
  });

  // Test code
  useEffect(() => {
    if (props.measures === undefined) {
      return;
    }
    (async () => {
      setLoading(true);
      const initialNutrients = await getNutrients(props.measures[0].uri, props.foodItem.food.foodId);

      setQuickNoteState((quickNoteState) => ({
        ...quickNoteState,
        baseCalories: initialNutrients.calories,
      }))

      const userNutrients = await getTodayUserNutrients();
      console.log(userNutrients)
      setNutrients(initialNutrients)
      setNutrientContext(userNutrients[0]);
      if (userNutrients[0].calorieBudget === null) {
        const calorieBudget = await getCalorieBudget();
        console.log(calorieBudget[0].calorieBudget)
        setNutrientContext((nutrientContext) => (
          {
            ...nutrientContext,
            calorieBudget: calorieBudget[0].calorieBudget
          }
        ))

      }
    })()


    // eslint-disable-next-line
  }, []);

  // Set new budgets after the calorie budget has been set to state
  useEffect(() => {
    if (nutrientContext === undefined) {
      setLoading(true)
    }
    (async () => {
      // Fetch all meals from today
      setLoading(true)
      const todayLogs = await getFoodLogsPersonal(moment().format('YYYY'), moment().format('MM'), moment().format('DD'));
      setLoading(true)
      console.log(todayLogs)
      if (todayLogs.length <= 0) {
        return;
      }

      // Calculate all calories, carbs, protein, fat, and sodium from those meals and set to state, subtract with calorie budget and save as calorie budget
      const calorieTotalFromLogs = todayLogs.reduce((prev, current) => {
        return prev + current.caloriesPerUnit * current.servingQty;
      }, 0);

      const carbsTotalFromLogs = todayLogs.reduce((prev, current) => {
        return prev + current.carbs * current.servingQty;
      }, 0);

      const proteinTotalFromLogs = todayLogs.reduce((prev, current) => {
        return prev + current.protein * current.servingQty;
      }, 0);

      const fatTotalFromLogs = todayLogs.reduce((prev, current) => {
        return prev + current.fat * current.servingQty;
      }, 0);

      const sodiumTotalFromLogs = todayLogs.reduce((prev, current) => {
        return prev + current.sodium * current.servingQty;
      }, 0);

      // Set remaining budgets (budget minus deductions from previous logs within the day)
      setRemainingBudgets({
        calories: nutrientContext.calorieBudget - calorieTotalFromLogs,
        carbs: recommendedCarbs - carbsTotalFromLogs,
        protein: recommendedProtein - proteinTotalFromLogs,
        fat: recommendedProtein - fatTotalFromLogs
      })
      setLoading(false);

    })()
    // Resolve this useEffect issue later
  }, [nutrientContext])

  useEffect(() => {
    console.log(remainingBudgets)
  }, [remainingBudgets])



  const handleToggle = (value) => {
    const newChecked = [];
    newChecked.push(value.mealId);
    setChecked(newChecked);
    setQuickNoteState({
      ...quickNoteState,
      mealType: mealTypes[newChecked[0] - 1].label.toLowerCase()
    })
  };

  const handleInputChange = (event) => {
    const target = event.target;
    setQuickNoteState({
      ...quickNoteState,
      [target.name]: target.value
    })

    if (target.name === "servingUnit") {
      const filteredArray = props.measures.filter((measure) => {
        return measure.label === target.value;
      })
      setMeasureItem(filteredArray);
    }
  }

  const handleClose = () => {
    if (modalHeading === "Note saved!") {
      navigate('/app/foodlog')
    }
    setLoading(false);


  }

  // Convert lowercase string to title case
  const toTitleCase = (str) => {
    const newFirst = str.charAt(0).toUpperCase();
    return newFirst + str.substr(1);
  }

  useEffect(() => {
    setLoading(true);
    if (props.measures === undefined) {
      return;
    }
    if (measureItem === undefined) {
      (async () => {
        setLoading(true);
        const newNutrients = await getNutrients(props.measures[0].uri, props.foodItem.food.foodId);
        setQuickNoteState({
          ...quickNoteState,
          baseCalories: newNutrients.calories,
          totalWeight: newNutrients.totalWeight,
          servingUnit: toTitleCase(newNutrients.ingredients[0].parsed[0].measure)
        });
        setNutrients(newNutrients);
        if (remainingBudgets !== undefined) {
          setLoading(false);
        }
      })()
      return;
    }
    (async () => {
      setLoading(true);
      const newNutrients = await getNutrients(measureItem[0].uri, props.foodItem.food.foodId);
      setQuickNoteState((quickNoteState) => (
        {
          ...quickNoteState,
          baseCalories: newNutrients.calories,
          totalWeight: newNutrients.totalWeight
        }
      ))
      setNutrients(newNutrients);
      if (remainingBudgets !== undefined) {
        setLoading(false);
      }

    })()
    // Resolve this useEffect issue later
    // eslint-disable-next-line
  }, [measureItem]);

  // Handle saving journal entry
  const handleSave = async () => {
    const body = {
      mealType: quickNoteState.mealType,
      diaryType: "detailed",
      foodId: nutrients.ingredients[0].parsed[0].foodId,
      foodName: nutrients.ingredients[0].parsed[0].food,
      servingUnit: quickNoteState.servingUnit,
      servingQty: quickNoteState.servingQty,
      caloriesPerUnit: quickNoteState.baseCalories,
      carbs: nutrients.totalNutrients.CHOCDF.quantity * quickNoteState.servingQty,
      protein: nutrients.totalNutrients.PROCNT.quantity * quickNoteState.servingQty,
      fat: nutrients.totalNutrients.FAT.quantity * quickNoteState.servingQty,
      sodium: nutrients.totalNutrients.NA.quantity * quickNoteState.servingQty,
      weightInG: nutrients.totalWeight
    }
    const response = await saveDetailedFoodLog(body);
    if (response === 200) {
      setOpen(true);
      setModalHeading("Note saved!")
      setModalBody("The note you created has been successfully saved.");
    } else if (response === 400) {
      setOpen(true);
      setModalHeading("Incorrect or incomplete input")
      setModalBody("Please make sure that you have completely filled up all required fields.")
    } else if (response === 500) {
      setOpen(true);
      setModalHeading("Server error")
      setModalBody("Oops! Something wrong happened on our end. Please try again later.")
    } else {
      setOpen(true);
      setModalHeading("Something wrong happened")
      setModalBody("We're not sure what happened, but we're at it to fix it.")
    }
  }





  return (
    props.measures === undefined ?
      <Navigate to="/app/food/search" /> :
      <Grid container direction="column" spacing={6}  >
        <Grid item xs={12}
          container direction='column' sx={{ background: '#F9AB10', paddingBottom: '1em' }}
        >

          <Button className='button-quicknote' variant='text' sx={{ color: 'black' }} startIcon={<KeyboardArrowLeftIcon />} onClick={() => { navigate('/app/food/search') }}>Back</Button>
          <Grid container justifyContent="space-between" paddingX="1em">
            <Grid item> <h1>{props.foodItem.food.label}</h1></Grid>
            <Grid item>
              <Button color='secondary' className='button-foodlog' variant='contained' onClick={handleSave}>Save</Button></Grid>

          </Grid>



        </Grid>

        <Grid item xs={12} container rowSpacing={4}>
          <img alt='Confetti' src={require('../../assets/img/sideview-beagle.png')} width='200px' height='200px' margin='auto' />

          <p>Please stop eating already</p>
        </Grid>

        <Grid item xs={6} container rowSpacing={4}>
          {mealTypes.map((meal) => {
            return (
              <Chip key={meal.mealId} label={meal.label} onClick={(event) => { handleToggle(meal) }} variant={checked.indexOf(meal.mealId) !== -1 ? "filled" : "outlined"} />
            )
          })}


        </Grid>

        <Grid item md={12}>
          <Grid container direction="row" justifyContent="flex-start">
            <Grid item md={6}>
              <TextField id="filled-basic" variant='filled' type="number" value={quickNoteState.servingQty} name="servingQty" onChange={handleInputChange} fullWidth />

            </Grid>

            <Grid item md={6}>
              <FormControl sx={{ minWidth: '5em' }}>
                <InputLabel id="serving-unit-label">Serving Unit</InputLabel>
                <Select
                  labelId="serving-unit-label"
                  id="serving-unit-select"
                  value={quickNoteState.servingUnit}
                  label="Serving Unit"
                  onChange={handleInputChange}
                  name="servingUnit"
                  fullWidth
                >
                  {props.measures.map((value) => (
                    <MenuItem key={value.label} value={value.label}>{value.label}</MenuItem>
                  ))}

                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid item md={12}>
            <Typography variant="subtitle1" component="h2">Weight in grams</Typography>
            <Typography variant="p">{quickNoteState.totalWeight + " g"}</Typography>
          </Grid>

          <Grid item md={12}>
            <Typography variant="subtitle1" component="h2">Amount of calories</Typography>
            <Typography variant="p">{quickNoteState.servingQty <= 0 || quickNoteState.servingQty === undefined ? 0 :
              Math.round(quickNoteState.baseCalories * quickNoteState.servingQty) + " calories"}</Typography>
          </Grid>


          <Grid item container md={12} direction="column">
            <Grid item md={12}>
              <Typography variant="subtitle1" component="h2">Context</Typography>
            </Grid>

            {remainingBudgets !== undefined ?
              <Box>
                <Grid item md={12}>
                  <LinearProgress variant='determinate' value={quickNoteState.baseCalories * quickNoteState.servingQty / remainingBudgets.calories * 100} color={quickNoteState.baseCalories * quickNoteState.servingQty / nutrientContext.calorieBudget * 100 > 100 ? 'red' : 'primary'} />
                </Grid>
                <Grid item md={12}>
                  <Typography variant="p" component="p">{`Remaining budget: ${remainingBudgets.calories} cal ${remainingBudgets.calories > quickNoteState.baseCalories * quickNoteState.servingQty ? '>' : '<'} ${remainingBudgets.calories} - ${quickNoteState.baseCalories * quickNoteState.servingQty} cal`}</Typography>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="p" component="p">You’d {(quickNoteState.baseCalories * quickNoteState.servingQty / remainingBudgets.calorieBudget * 100) > 100 ? "exceed" : "be within"} your calorie budget if you eat this amount.</Typography>
                </Grid>

                <Grid item md={12} container paddingY={2} spacing={5} justifyContent="center">
                  <Grid item xs={4}>
                    <LinearProgress variant='determinate' value={(nutrientContext.sumCarbs + nutrients.totalNutrients.CHOCDF.quantity * quickNoteState.servingQty) / remainingBudgets.carbs * 100} color={(nutrientContext.sumCarbs + nutrients.totalNutrients.CHOCDF.quantity * quickNoteState.servingQty) / remainingBudgets.carbs * 100 > 100 ? 'red' : 'primary'} />
                  </Grid>
                  <Grid item xs={4}>
                    <LinearProgress variant='determinate' value={(nutrientContext.sumFat + nutrients.totalNutrients.FAT.quantity * quickNoteState.servingQty) / remainingBudgets.fat * 100} color={(nutrientContext.sumFat + nutrients.totalNutrients.FAT.quantity * quickNoteState.servingQty) / remainingBudgets.fat * 100 > 100 ? 'red' : 'primary'} />
                  </Grid>
                  <Grid item xs={4}>

                    <LinearProgress variant='determinate' value={(nutrientContext.sumProtein + nutrients.totalNutrients.PROCNT.quantity * quickNoteState.servingQty) / remainingBudgets.protein * 100} color={(nutrientContext.sumProtein + nutrients.totalNutrients.PROCNT.quantity * quickNoteState.servingQty) / remainingBudgets.protein * 100 > 100 ? 'red' : 'primary'} />
                  </Grid>
                </Grid>
              </Box>
              : <CircularProgress variant='indeterminate' />

            }

          </Grid>

        </Grid>



        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Dialog
          open={open}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {modalHeading}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {modalBody}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Okay</Button>
          </DialogActions>
        </Dialog>


      </Grid>



  );


}



export default LogScreen;