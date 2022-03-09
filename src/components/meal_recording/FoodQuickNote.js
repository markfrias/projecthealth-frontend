import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Chip, Container, Grid, Input } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { saveNote } from '../auth/APIServices';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function NoteSavedModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Note saved!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your quick note of your meal has been successfully saved.
          </Typography>
          <Button color="primary" size="small" onClick={handleClose}>
            OKAY
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >

          </IconButton>
        </Box>

      </Modal>
    </div>
  );
}

function MealEntryModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Meal log saved!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your meal journal entry has been successfully saved.
          </Typography>
          <Button color="primary" size="small" onClick={handleClose}>
            OKAY
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >

          </IconButton>
        </Box>

      </Modal>
    </div>
  );
}

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
    navigate('/app/logscreen');
  }

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

  const handleChange = (event) => {
    const target = event.target;

    setQuickNoteState({
      ...quickNoteState,
      [target.name]: target.value,
    })
    console.log(target.files)
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

  useEffect(() => {
    console.log(quickNoteState)
  }, [quickNoteState]);

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

          <img alt="upload picture" src={quickNoteState.photosUrl} />

        </Grid>

        <Grid>

          <Button variant='contained' onClick={handleSave}>Save Note</Button>
          <NoteSavedModal></NoteSavedModal>
          <MealEntryModal></MealEntryModal>

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