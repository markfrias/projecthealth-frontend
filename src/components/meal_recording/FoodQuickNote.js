import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Chip, Container, Grid, Input } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Typography from '@mui/material/Typography';
import { saveNote } from '../auth/APIServices';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const FoodQuickNote = () => {
  const navigate = useNavigate();

  const mealTypes = [
    { mealId: 1, label: "Breakfast" },
    { mealId: 2, label: "Lunch" },
    { mealId: 3, label: "Dinner" },
    { mealId: 4, label: "Snack" }
  ];

  const initialState = {
    foodName: "",
    servingDescription: "",
    photosUrl: "",
    mealType: ""
  }

  const [checked, setChecked] = useState([0]);
  const [quickNoteState, setQuickNoteState] = useState(initialState);

  const [open, setOpen] = useState(false);
  const [modalHeading, setModalHeading] = useState("");
  const [modalBody, setModalBody] = useState("");
  const handleClose = () => {
    setOpen(false);
    navigate('/app/foodlogmainscreen');
  }

  const handleToggle = (value) => {
    const newChecked = [];

    newChecked.push(value.mealId);
    setChecked(newChecked);

    setQuickNoteState({
      ...quickNoteState,
      mealType: mealTypes[newChecked[0] - 1].label.toLowerCase()
    })
  };

  const handleChange = (event) => {
    const target = event.target;

    setQuickNoteState({
      ...quickNoteState,
      [target.name]: target.value,
    })
  }

  const handleSave = async () => {
    const response = await saveNote(quickNoteState);
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
    <Grid container spacing={4} >
      <Grid item xs={12} className='quicknote-container1'
        container direction='column'
      >
        <Button className='button-quicknote' variant='text' sx={{ color: 'black' }} startIcon={<KeyboardArrowLeftIcon />}>Back</Button>
        <Typography variant='onboardingHeader' component='h1' >Quick Note</Typography>
      </Grid>


      <Container
        sx={{
          '& > :not(style)': { m: 2, width: 300 },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid item xs={12}>
          <Typography variant='subtitle1B' component='p' >What's this meal for?</Typography>
        </Grid>
        <Grid item xs={6} container rowSpacing={4}>
          {mealTypes.map((meal) => {
            return (
              <Chip key={meal.mealId} label={meal.label} onClick={(event) => { handleToggle(meal) }} variant={checked.indexOf(meal.mealId) !== -1 ? "filled" : "outlined"} />
            )
          })}


        </Grid>
        <Typography variant='subtitle1B' component='p' >Brief description of food</Typography>
        <TextField id="outlined-basic"
          value={quickNoteState.foodName}
          onChange={handleChange}
          name="foodName"
          label="Food Description" variant="outlined" />
        <Typography variant='subtitle1B' component='p' >Description of food amount</Typography>
        <TextField id="outlined-basic" label="Amount of food"
          value={quickNoteState.servingDescription}
          onChange={handleChange}
          name="servingDescription" variant="outlined" />
        <Grid item xs={12} container spacing={4}>

          <Typography variant='subtitle1' component='p' >(Optional) Picture of the meal, food, or drink</Typography>

          <Button variant='contained' startIcon={<AddAPhotoOutlinedIcon />} ></Button>

          <Input name="photosUrl" type="file" id="file-upload-btn" onChange={handleChange} hidden />

          <label htmlFor='file-upload-btn'>
            <Button htmlFor="file-upload-btn" component="span">
              Upload
            </Button>

          </label>

          <img alt="upload" src={quickNoteState.photosUrl} />

        </Grid>

        <Grid>

          <Button variant='contained' onClick={handleSave}>Save Note</Button>


        </Grid>
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
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
          <Button onClick={handleClose}>Okay</Button>
        </DialogActions>
      </Dialog>

    </Grid>



  );


}



export default FoodQuickNote;