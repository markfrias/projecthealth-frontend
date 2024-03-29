import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Backdrop, Chip, /*Container,*/ Grid /*,Input*/ } from '@mui/material';
import TextField from '@mui/material/TextField';
//import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Typography from '@mui/material/Typography';
import { saveNote } from '../auth/APIServices';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { addHp, addPp } from '../auth/GamificationAPI';


const FoodQuickNote = (props) => {
  const navigate = useNavigate();

  // State for modal content
  const [dialogHead, setDialogHead] = useState();
  const [dialogBody, setDialogBody] = useState();
  const [openSuccess, setOpenSuccess] = React.useState(false);

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
    if ((props.pp + 2) / props.ppBoundary * 100 >= 100) {
      // Save old level
      const oldLevel = props.account.levelId;

      props.setAccount({
        ...props.account,
        levelId: props.account.levelId + 1
      })
      console.log((props.pp + 2) - props.ppBoundary)
      props.setPp((props.pp + 2) - props.ppBoundary);
      console.log(props.ppBoundary + 5)

      props.setPpBoundary(props.ppBoundary + 5)
      addHp(props.hp + 3);
      props.setHp(props.hp + 3);
      setDialogHead('Your pet leveled up');
      setDialogBody("Graaape. Your pet's health increased. See dashboard to see where to go next 🍇🍇🍇.")
      setOpenSuccess(true);

      addPp((props.pp + 2) - props.ppBoundary, props.ppBoundary, oldLevel + 1)
      const response = await saveNote(quickNoteState);
      if (response === 200) {
        setOpen(true);
        setModalHeading("Note saved!")
        setModalBody("The note you created has been successfully saved. Plus 2 progress points 💯");
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

      return
    }
    props.setPp(props.pp + 2, props.ppBoundary)
    addPp(props.pp + 2, props.ppBoundary, props.account.levelId)

    const response = await saveNote(quickNoteState);

    if (response === 200) {
      setOpen(true);
      setModalHeading("Note saved!")
      setModalBody("The note you created has been successfully saved. Plus 2 progress points 💯");
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
    <Grid container direction="column">
      <Grid item xs={12} sx={{ background: '#F9AB10', p: "1em", mb: '2.5em' }}
        container direction='column'
      >
        <Button variant='text' sx={{ color: 'black', maxWidth: '20%', mb: '.5em' }} startIcon={<KeyboardArrowLeftIcon />} component={Link} to="/app/foodlogmainscreen">Back</Button>
        <Typography variant='onboardingHeader2' component='h1' >Quick Note</Typography>
      </Grid>

      <Grid item container direction="column" px="1em">
        <Typography variant='subtitle1B' component='p' mb=".5em" >What's this meal for?</Typography>
        <Grid item xs={12} container direction="row" mb="1em" >
          {mealTypes.map((meal) => {
            return (
              <Chip key={meal.mealId} label={meal.label} onClick={(event) => { handleToggle(meal) }} variant={checked.indexOf(meal.mealId) !== -1 ? "filled" : "outlined"} sx={{ mr: '.25em' }} />
            )
          })}


        </Grid>
        <Typography variant='subtitle1B' component='p' >Brief description of food</Typography>
        <TextField id="outlined-basic"
          value={quickNoteState.foodName}
          onChange={handleChange}
          name="foodName"
          label="Food Description" variant="outlined"
          sx={{
            mb: '1em'
          }} />
        <Typography variant='subtitle1B' component='p' >Description of food amount</Typography>
        <TextField id="outlined-basic" label="Amount of food"
          value={quickNoteState.servingDescription}
          onChange={handleChange}
          name="servingDescription" variant="outlined" sx={{
            mb: '1em'
          }} />



        <Grid item sx={{ position: 'fixed', bottom: '1em', left: '0', right: '0', width: '100%', px: '1em' }}>

          <Button variant='contained' onClick={handleSave} sx={{ width: '100%' }}>Save Note</Button>


        </Grid>
      </Grid>



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

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openSuccess}
        onClick={() => { setOpenSuccess(false) }}>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <img alt='Confetti' src={require('../../assets/img/3d-confetti.png')} width='200px' height='200px' margin='auto' />
          </Grid>
          <Grid item xs={12}>
            <h1>{dialogHead}</h1>
          </Grid>
          <Grid item xs={12}>
            <p>{dialogBody}</p>
          </Grid>
        </Grid>
      </Backdrop>

    </Grid >



  );


}



export default FoodQuickNote;