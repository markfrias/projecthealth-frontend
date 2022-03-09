import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Chip, Container, FormControl, Grid, InputLabel, LinearProgress, MenuItem, Select } from '@mui/material';
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
import { useNavigate } from 'react-router-dom';



const LogScreen = () => {
  const navigate = useNavigate();
  const mealTypes = [
    { mealId: 1, label: "Breakfast" },
    { mealId: 2, label: "Lunch" },
    { mealId: 3, label: "Dinner" },
    { mealId: 4, label: "Snack" }
  ];

  const initialState = {
    servingQty: "",
    foodName: "",
    servingDescription: "",
    photosUrl: "",
    mealType: "",
    servingUnit: ""
  }

  const [checked, setChecked] = useState([0]);
  const [quickNoteState, setQuickNoteState] = useState(initialState);

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
  }



  return (
    <Grid container direction="column" spacing={6}  >
      <Grid item xs={12}
        container direction='column' sx={{ background: '#F9AB10', paddingBottom: '1em' }}
      >

        <Button className='button-quicknote' variant='text' sx={{ color: 'black' }} startIcon={<KeyboardArrowLeftIcon />} onClick={() => { navigate('/app/detailedfoodlogscreen') }}>Back</Button>
        <Grid container justifyContent="space-between" paddingX="1em">
          <Grid item> <h1>Beef Lasagna</h1></Grid>
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

                <MenuItem value={"kg"}>kg</MenuItem>
                <MenuItem value={"lbs"}>lbs</MenuItem>
                <MenuItem value={"st"}>st</MenuItem>


              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid item md={12}>
          <Typography variant="subtitle1" component="h2">Weight in grams</Typography>
          <Typography variant="p">127 calories</Typography>
        </Grid>

        <Grid item md={12}>
          <Typography variant="subtitle1" component="h2">Amount of calories</Typography>
          <Typography variant="p">127 calories</Typography>
        </Grid>

        <Grid item container md={12} direction="column">
          <Grid item md={12}>
            <Typography variant="subtitle1" component="h2">Context</Typography>
          </Grid>

          <Grid item md={12}>
            <LinearProgress variant='determinate' value={50} />
          </Grid>
          <Grid item md={12}>
            <Typography variant="p" component="p">1500 + 780 cal > 1700 cal</Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="p" component="p">You’d exceed your calorie budget if you eat this amount.</Typography>
          </Grid>

          <Grid item md={12} container paddingY={2} spacing={5} justifyContent="center">
            <Grid item xs={4}>
              <LinearProgress variant='determinate' value={50} />
            </Grid>
            <Grid item xs={4}>
              <LinearProgress variant='determinate' value={50} />
            </Grid>
            <Grid item xs={4}>
              <LinearProgress variant='determinate' value={50} />
            </Grid>
          </Grid>

        </Grid>

      </Grid>





    </Grid>



  );


}



export default LogScreen;