import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Backdrop, Chip, CircularProgress, Container, FormControl, Grid, InputLabel, LinearProgress, MenuItem, Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import ListItemText from '@mui/material/IconButton';
import ReorderIcon from '@mui/icons-material/Reorder';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { getCalorieBudget, getFoodSearchResults, getNutrients, getTodayUserNutrients } from '../auth/APIServices';
import { UndoRounded } from '@mui/icons-material';



const LogScreen = (props) => {

  // Recommended values
  const recommendedCarbs = 300;
  const recommendedFat = 65;
  const recommendedProtein = 50;

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
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
      return navigate('/app/food/search');
    }
    console.log(searchParams.get('q'))
    console.log(props.foodItem);
    (async () => {

      const initialNutrients = await getNutrients(props.measures[0].uri, props.foodItem.food.foodId);
      setQuickNoteState({
        ...quickNoteState,
        baseCalories: initialNutrients.calories,
      })

      const userNutrients = await getTodayUserNutrients();
      setNutrients(initialNutrients)
      console.log(userNutrients)
      setNutrientContext(userNutrients[0]);
      if (userNutrients[0].calorieBudget === null) {
        const calorieBudget = await getCalorieBudget();
        console.log(calorieBudget)
        setNutrientContext({
          ...nutrientContext,
          calorieBudget: calorieBudget[0].calorieBudget
        })
      }


    })()
  }, []);

  const handleToggle = (value) => {
    const newChecked = [];

    newChecked.push(value.mealId);


    setChecked(newChecked);
    console.log(newChecked)

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
    setLoading(false);
  }

  // Convert lowercase string to title case
  const toTitleCase = (str) => {
    const newFirst = str.charAt(0).toUpperCase();
    return newFirst + str.substr(1);
  }

  useEffect(() => {
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
        setLoading(false);

      })()
      return;
    }
    (async () => {
      setLoading(true);
      const newNutrients = await getNutrients(measureItem[0].uri, props.foodItem.food.foodId);
      setQuickNoteState({
        ...quickNoteState,
        baseCalories: newNutrients.calories,
        totalWeight: newNutrients.totalWeight
      });
      setNutrients(newNutrients);
      setLoading(false);
    })()
  }, [measureItem]);

  useEffect(() => {
    if (nutrients.totalNutrients !== undefined) {
      console.log(nutrients.totalNutrients.CHOCDF.quantity * quickNoteState.servingQty / recommendedCarbs * 100);
      console.log((nutrientContext.sumCarbs + nutrients.totalNutrients.CHOCDF.quantity * quickNoteState.servingQty) / recommendedCarbs * 100)
    }
  }, [nutrients])





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
              <Button color='secondary' className='button-foodlog' variant='contained'>Save</Button></Grid>

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

            <Grid item md={12}>
              {nutrientContext.calorieBudget === null ?
                <LinearProgress variant='indeterminate' /> :
                <LinearProgress variant='determinate' value={quickNoteState.baseCalories * quickNoteState.servingQty / nutrientContext.calorieBudget * 100} color={quickNoteState.baseCalories * quickNoteState.servingQty / nutrientContext.calorieBudget * 100 > 100 ? 'secondary' : 'primary'} />
              }
            </Grid>
            <Grid item md={12}>
              <Typography variant="p" component="p">1500 + 780 cal > 1700 cal</Typography>
            </Grid>
            <Grid item md={12}>
              <Typography variant="p" component="p">You’d exceed your calorie budget if you eat this amount.</Typography>
            </Grid>

            <Grid item md={12} container paddingY={2} spacing={5} justifyContent="center">
              <Grid item xs={4}>
                {
                  nutrients.totalNutrients === undefined ?
                    <CircularProgress variant='indeterminate' /> :
                    <LinearProgress variant='determinate' value={(nutrientContext.sumCarbs + nutrients.totalNutrients.CHOCDF.quantity * quickNoteState.servingQty) / recommendedCarbs * 100} color={quickNoteState.baseCalories * quickNoteState.servingQty / nutrientContext.calorieBudget * 100 > 100 ? 'secondary' : 'primary'} />


                }
              </Grid>
              <Grid item xs={4}>
                {
                  nutrients.totalNutrients === undefined ?
                    <CircularProgress variant='indeterminate' /> :
                    <LinearProgress variant='determinate' value={(nutrientContext.sumFat + nutrients.totalNutrients.FAT.quantity * quickNoteState.servingQty) / recommendedFat * 100} color={quickNoteState.baseCalories * quickNoteState.servingQty / nutrientContext.calorieBudget * 100 > 100 ? 'secondary' : 'primary'} />


                }
              </Grid>
              <Grid item xs={4}>
                {
                  nutrients.totalNutrients === undefined ?
                    <CircularProgress variant='indeterminate' /> :
                    <LinearProgress variant='determinate' value={(nutrientContext.sumProtein + nutrients.totalNutrients.PROCNT.quantity * quickNoteState.servingQty) / recommendedProtein * 100} color={quickNoteState.baseCalories * quickNoteState.servingQty / nutrientContext.calorieBudget * 100 > 100 ? 'secondary' : 'primary'} />


                }              </Grid>
            </Grid>

          </Grid>

        </Grid>



        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

      </Grid>



  );


}



export default LogScreen;