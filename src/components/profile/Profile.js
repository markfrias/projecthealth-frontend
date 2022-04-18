import Button from '@mui/material/Button';
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import { getLevelCountries, logout } from '../auth/APIServices';
import { Link } from 'react-router-dom';
import { LockRounded, MoreHorizRounded, OpenInFullRounded } from '@mui/icons-material';

const style = {
  width: '100%',
  bgcolor: 'rgba(0, 0, 0, 0)',
};

function ListDividers(props) {
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">

      <ListItem button component={Link} to="/app/settings/account ">
        <Typography variant='subtitle1' component='p'>Account settings</Typography>
      </ListItem>
      <Divider />
      <ListItem button component={Link} to="/app/notif-settings">
        <Typography variant='subtitle1' component='p'>Notification settings</Typography>
      </ListItem>
      {/*<ListItem button>
        <Typography variant='subtitle1' component='p'>Goal settings</Typography>
  </ListItem>*/}
      <Divider sx={{ mb: 4 }} />

      <ListItem button component={Link} to="/app/progress-report">
        <Typography variant='subtitle1' component='p' >Progress report</Typography>
      </ListItem>
      <Divider />
      <ListItem button component={Link} to="/app/settings/height">
        <Typography variant='subtitle1' component='p'>Change weight or height</Typography>
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
      <Avatar sx={{ bgcolor: deepOrange[500] }}>YA</Avatar>
    </Stack>
  );
}

const Profile = (props) => {
  const [open, setOpen] = React.useState(false);
  const [modalHeading, setModalHeading] = React.useState("");
  const [modalBody, setModalBody] = React.useState("");
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    setLoading(true);
    // Fetch levels and flag urls
    (async () => {
      const countries = await getLevelCountries();
      props.setLevels(countries);

      // Fix issue with hooks warning
    })()
  }, [])

  useEffect(() => {
    console.log(props.levels)
    if (props.levels !== undefined) {
      setLoading(false);
      console.log(props.levels)
    }
  }, [props.levels])


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

      <Grid item container px={1}>
        <Grid item xs={12} container direction='row' alignItems="center" pb={1}>
          <LetterAvatars  ></LetterAvatars>
          <Typography sx={{ marginLeft: '.5em' }} variant='subtitle1B' component='h1' >{props.account.firstName}</Typography>
        </Grid>

        <Grid item xs={12} container direction='row' pb={2}>
          <Typography variant='subtitle1' component='p' >{props.account.emailAddress}</Typography>
        </Grid>

        <Grid item container xs={12} direction="column" className='passport-holder' sx={{ my: '1em', backdropFilter: 'blur(3px)' }}>
          <Grid item container xs={12} mb={1} >
            <Grid item xs={9}> <Typography variant='onboardingHeader2' component='h2' sx={{ mb: '.5em' }} >Passport</Typography></Grid>

            <Grid item container xs={3} justifyContent="flex-end">
              <IconButton sx={{ color: 'black' }} component={Link} to="/app/passport">
                <OpenInFullRounded />
              </IconButton>
            </Grid>

          </Grid>

          {loading || props.levels === undefined ?
            <Grid item container xs={12} justifyContent="center" alignItems="center">
              <CircularProgress variant='indeterminate' />
            </Grid>
            :
            <Grid item container xs={12} direction="row" alignItems="center" mb={1}>
              <img alt="Philippine flag" src={props.levels[0].countryImg} />
              <img alt="Philippine flag" src={props.levels[1].countryImg} />
              <img alt="Philippine flag" src={props.levels[2].countryImg} />
              <img alt="Philippine flag" src={props.levels[3].countryImg} style={{ marginRight: '.5em' }} />
              <MoreHorizRounded sx={{ fontSize: '2em' }} />
            </Grid>


          }

          <Grid item container>
            <Button variant="text" sx={{ color: 'black', textTransform: 'uppercase' }} component={Link} to="/app/passport">Open to see stamp collection</Button>
          </Grid>

        </Grid>

        <Grid item xs={12} container direction='row'>
          <ListDividers handleClick={handleClickOpen}></ListDividers>
        </Grid>

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