import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material';
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import { logout } from '../auth/APIServices';
import { Link } from 'react-router-dom';

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'floralwhite',
};

function ListDividers(props) {
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem button component={Link} to="/app/progress-report">
        <Typography variant='subtitle1' component='p' >Progress report</Typography>
      </ListItem>
      <Divider />
      <ListItem button component={Link} to="/app/settings/account ">
        <Typography variant='subtitle1' component='p'>Account settings</Typography>
      </ListItem>
      <Divider />
      <ListItem button component={Link} to="/app/notif-settings">
        <Typography variant='subtitle1' component='p'>Notification settings</Typography>
      </ListItem>
      <Divider />
      {/*<ListItem button>
        <Typography variant='subtitle1' component='p'>Goal settings</Typography>
  </ListItem>*/}
      <Divider />
      <ListItem button component={Link} to="/app/settings/height">
        <Typography variant='subtitle1' component='p'>Weight and height</Typography>
      </ListItem>
      <Divider />
      <ListItem button onClick={props.handleClick}>
        <Typography variant='profileLogout' component='p'>Logout</Typography>
      </ListItem>
    </List>
  );
}

function LetterAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>AD</Avatar>
    </Stack>
  );
}

const Profile = (props) => {
  const [open, setOpen] = React.useState(false);
  const [modalHeading, setModalHeading] = React.useState("");
  const [modalBody, setModalBody] = React.useState("");

  const handleClickOpen = () => {
    setModalHeading("Log out");
    setModalBody("Do you want to log out your account from this device?");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Account deletion handler
  const handleConfirm = async () => {
    setOpen(false);
    logout();

  }


  return (
    <Grid container direction="column" >
      < Grid item xs={12}
        container direction='column' sx={{ background: '#F9AB10', p: '1em', mb: '1em' }
        }
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item> <Typography variant="onboardingHeader2" component="h1">Profile</Typography  ></Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} container direction='row'>
        <LetterAvatars></LetterAvatars>
        <Typography variant='subtitle1B' component='h1' >Ashley Dela Cruz</Typography>
      </Grid>

      <Grid item xs={12} container direction='row'>
        <Typography variant='subtitle1' component='p' >ashleycruz@newscorp.com</Typography>
      </Grid>

      <Grid item xs={12} container direction='row'>
        <ListDividers handleClick={handleClickOpen}></ListDividers>
      </Grid>



      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="title"
        aria-describedby="description"
      >

        <DialogTitle id="title">{modalHeading}</DialogTitle>
        <DialogContent>

          <DialogContentText id="description">
            {modalBody}
          </DialogContentText>


        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            handleConfirm();
          }} color="primary">
            Confirm
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>



      </Dialog>

    </Grid>






  );


};



export default Profile;