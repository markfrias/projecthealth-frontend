import React from 'react';
import Button from '@mui/material/Button';
import { Container, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';


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
    return (
        <Grid container spacing={4} >
            <Grid item xs={12} className='quicknote-container1' 
            container direction = 'column'
            >
                <Button className='button-quicknote' variant='text' sx={{color: 'black'}} startIcon={<KeyboardArrowLeftIcon/>}>Back</Button>
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
                <Button className='button-quicknote' variant='contained' sx={{color: 'black'}}>Breakfast</Button>
                <Button className='button-quicknote' variant='contained' sx={{color: 'black'}}>Lunch</Button>
                <Button className='button-quicknote' variant='contained' sx={{color: 'black'}}>Dinner</Button>
                <Button className='button-quicknote' variant='contained' sx={{color: 'black'}}>Snack</Button>
            </Grid>
                <Typography variant='subtitle1B' component='p' >Brief description of food</Typography>
                <TextField id="outlined-basic" label="Food Description" variant="outlined" />
                <Typography variant='subtitle1B' component='p' >Description of food amount</Typography>
                <TextField id="outlined-basic" label="Amount of food" variant="outlined" />
            <Grid item xs={12} container spacing={4}>
                
            <Typography variant='subtitle1' component='p' >(Optional) Picture of the meal, food, or drink</Typography>
             
            <Button variant='contained' startIcon={<AddAPhotoOutlinedIcon/>} ></Button>
            
            </Grid>

            <Grid>
            <Button variant='contained'  >Save Note</Button>
            <NoteSavedModal></NoteSavedModal>
            <MealEntryModal></MealEntryModal>

            </Grid>
            </Container>
            
        </Grid>



    );


}



export default FoodQuickNote;