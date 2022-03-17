import { Container, Grid, Typography } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';



const Accountsetting = () => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  return (
    <Grid container spacing={4} >
      <Grid item xs={12} className='quicknote-container1'
        container direction='column'
      >
        <Button className='button-quicknote' variant='text' sx={{ color: 'black' }} startIcon={<KeyboardArrowLeftIcon />}>Back</Button>
        <Typography variant='onboardingHeader' component='h1' >Account settings</Typography>
      </Grid>
      <Container
        sx={{
          '& > :not(style)': { m: 2, width: 300 },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant='subtitle1B' component='h2'>Acoount Management</Typography>
        <Button variant='subtitle1B' color='#730707' position='left' onClick={handleClickOpen}>Delete account</Button>
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-labelledby="title"
          aria-describedby="description"
        >
          <DialogTitle id="title">{"Account Deletion"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="description">
              Are you sure you want to delete this account?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setOpen2(true)
              setOpen(false)
            }} color="primary">
              Confirm
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={open2}
          keepMounted
          onClose={handleClose2}
          aria-labelledby="title"
          aria-describedby="description"
        >
          <DialogTitle id="title">{"Account Deletion"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="description2">
              Your account has been successfully deleted
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose2} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>

      </Container>

    </Grid>



  );


};



export default Accountsetting;