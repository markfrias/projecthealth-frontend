import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { deleteAccount, logout } from '../auth/APIServices';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';



const Accountsetting = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [modalHeading, setModalHeading] = React.useState("");
  const [modalBody, setModalBody] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  // Account deletion handler
  const handleConfirm = async () => {
    setLoading(true);
    const response = await deleteAccount();
    if (response === 500) {
      setModalHeading("Oops, server error")
      setModalBody("An error occurred on our end. Please try again soon.")
      setOpen(false);
      setOpen2(true);
    } else if (response === 200) {
      setModalHeading("Account deletion")
      setModalBody("Your account has been succesfully deleted.")
      setOpen(false);
      setOpen2(true);
      setTimeout(() => {
        navigate('/app/login');
        logout();
      }, 2000);

    }
    setLoading(false)
  }

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
        <Typography variant='subtitle1B' component='h2'>Account Management</Typography>
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
            {loading ? <CircularProgress variant='indeterminate' /> :
              <DialogContentText id="description">
                Are you sure you want to delete this account?
              </DialogContentText>
            }

          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirm} color="primary">
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
          <DialogTitle id="title">{modalHeading}</DialogTitle>
          <DialogContent>
            <DialogContentText id="description2">
              {modalBody}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setOpen2(false);
            }} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>

      </Container>

    </Grid>



  );


};



export default Accountsetting;