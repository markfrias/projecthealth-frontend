import { Alert, CircularProgress, Container, Fab, Grid, IconButton, Modal, Snackbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Backdrop from '@mui/material/Backdrop';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { getMissions, saveMissionStatus } from '../auth/APIServices';
import { Close } from '@mui/icons-material';

function LinearDeterminate(props) {
  const progress = props.numerator / props.denominator * 100;

  return (
    <Box>
      <LinearProgress variant="determinate" value={progress} sx={{ height: '1em', borderRadius: '20px', border: 'solid 2px black' }} color={props.type === "hp" ? progress > 50 ? 'green' : 'red' : 'green'} />
    </Box>
  );
}

const Dashboard = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [openSuccess] = React.useState(false);
  const [snackbarContent, setSnackbarContent] = useState("");
  const [missionsAccomplishedOpen, setMissionsAccomplishedOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  const handleToggle = (value) => async () => {
    const currentIndex = props.checked.indexOf(value);
    const newChecked = [...props.checked];
    let status = 1;

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
      status = 0;
    }

    props.setChecked(newChecked);
    // Send request to server to change the status in the DB
    const body = { missionEntryId: value, missionAccomplished: status };

    // Make missions accomplished backdrop appear when all three checkboxes are checked
    if (props.checked.length === 2 && status === 1) {
      setMissionsAccomplishedOpen(true);
    }

    const response = await saveMissionStatus(body);
    console.log(response)

    if (response === 500) {
      setSnackbarContent("An error occurred on our end. Please try again soon.")
      setSnackbarOpen(true)
    } else if (response === 200) {
      setSnackbarContent("Mission status succesfully saved")
      setSnackbarOpen(true)
    }


  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  }

  const handleMissionAccomplished = () => {
    setMissionsAccomplishedOpen(false);
  }

  useEffect(() => {
    if (props.missions !== undefined) {
      (async () => {
        // On render get missions
        const newMissions = await getMissions();
        console.log(newMissions);

        props.setMissions(newMissions[0]);
        console.log(newMissions)

        // Set checkboxes
        const newChecked = [];
        newMissions[0].forEach((mission) => {
          if (mission.missionAccomplished === 1) {
            newChecked.push(mission.missionEntryId);
          }
        });
        props.setChecked(newChecked);
      })()
    }

  }, []);

  return (
    <Container maxWidth="md" sx={{
      minHeight: "100vh",
      justifyContent: "space-between",
      display: "flex",
      flexDirection: "column",
      pb: '3.75rem',
      pt: '2em'
    }}>


      <Grid item xs={12} container direction="row">
        <Grid item xs={6}>
          <img alt="Dog Sitting" src={require("../../assets/img/beagle-dog-sitting.png")} height="100%" width="100%" />
        </Grid>
        <Grid item xs={6} container>
          <Grid item xs={12}>
            <Typography variant='subtitle1B' component='h1' >😐 Feeling meh</Typography>
          </Grid>

          <Grid item xs={12} >
            <Typography variant='subtitle1' component='h1' >Health </Typography>
          </Grid>
          <Grid item xs={12}  >
            <LinearDeterminate numerator={props.hp} denominator={100} type="hp"></LinearDeterminate>
          </Grid>
          <Grid item xs={12}  >
            <Typography variant='subtitle1B' component='h1' >{props.hp} / 100</Typography>
          </Grid>


          <Grid item xs={12}  >
            <Typography variant='subtitle1' component='h1' >Progress </Typography>
          </Grid>
          <Grid item xs={12}  >
            <LinearDeterminate numerator={props.pp} denominator={120} type="pp"></LinearDeterminate>
          </Grid>
          <Grid item xs={6} >
            <Typography variant='subtitle1B' component='h1' >{props.pp}/150</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='subtitle1B' component='h1' >Level 4</Typography>
          </Grid>








        </Grid>
      </Grid>

      <Alert severity='warning'>
        The feature above is not yet available. It will be available very soon. Thanks for your understanding. In the meantime, you can still use the other features of the app.
      </Alert>
      <div className='dashboard-container1'>
        <Typography variant='onboardingHeader2' component='h2' >Tip</Typography>
        <Typography variant='onboardingSubheader2' component='p'>Increase progress points and level up by accomplishing
          a mission or logging your food/habit/activity.</Typography>
      </div>
      <div className='dashboard-container2'>
        <Typography variant='onboardingHeader2' component='h1'>Daily Missions</Typography>
        {props.missions <= 0 ?
          <CircularProgress variant='indeterminate' /> :
          <List dense sx={{ width: '100%', maxWidth: 360 }}>
            {props.missions.map((value) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <ListItem
                  key={value.missionEntryId}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(value.missionEntryId)}
                      checked={props.checked.indexOf(value.missionEntryId) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  }
                  disablePadding
                  onClick={handleToggle(value.missionEntryId)}
                >
                  <ListItemButton>

                    <ListItemText id={labelId} primary={value.missionName} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        }
      </div>

      <Fab variant="extended" color="primary" sx={{ position: "fixed", bottom: '5em', right: '1em' }} onClick={() => { /*setOpen(true)*/ navigate('/app/foodlogmainscreen') }}>
        <AddIcon />
        Log
      </Fab>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openSuccess}
        onClick={handleClose}>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <img alt='Confetti' src={require('../../assets/img/3d-confetti.png')} width='200px' height='200px' margin='auto' />
          </Grid>
          <Grid item xs={12}>
            <h1>All missions completed</h1>
          </Grid>
          <Grid item xs={12}>
            <p>You're done for today. Continue logging to get more progress points</p>
          </Grid>
        </Grid>
      </Backdrop>


      {/* log selection */}
      <Modal
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "rgba(255,248,236, 1)" }}
        open={open}
        /*onClick={handleClose}*/ >

        <Grid container direction="column" px="1em" alignItems="space-between" height="100vh">

          <Grid item container justifyContent="flex-end">
            <IconButton onClick={handleClose}>
              <Close fontSize="large" sx={{ color: 'white' }} />
            </IconButton>
          </Grid>

          <Grid item container sx={{ border: 'solid 2px black', borderRadius: '20px', padding: '1em' }} onClick={() => { navigate('/app/foodlogmainscreen') }} direction="row" alignItems="center" >
            <Grid item xs={5}>
              <img alt="Green Broccoli" src={require("../../assets/img/green-broccoli.png")} height="auto" width="35%" />
            </Grid>
            <Grid item xs={7} sx={{ fontSize: '1.25em' }}>
              <p>Food</p>

            </Grid>
          </Grid>

          <Grid item>

          </Grid>

        </Grid>

        {/*
          
           <Grid container spacing={2} sx={{ height: '100%', overflow: "scroll" }} direction="row" px='1em'>
          <Grid item container direction="row" xs={12} sx={{ width: '100%', height: 'auto' }}>

            <Grid item container onClick={() => { setOpen(false) }} justifyContent="flex-end" direction="row"   >
              <Grid item >
                <IconButton>
                  <Close fontSize="large" sx={{ color: 'white' }} />
                </IconButton>
              </Grid>
            </Grid>


            <Grid item container sx={{ border: 'solid 2px black', borderRadius: '20px' }} onClick={() => { navigate('/app/foodlogmainscreen') }}  >
              <Grid item xs={5}>
                <img alt="Green Broccoli" src={require("../../assets/img/green-broccoli.png")} height="auto" width="35%" />
              </Grid>
              <Grid item xs={7}>
                <p>Food</p>

              </Grid>
            </Grid>

            {/* 
            <Grid container sx={{ border: 'solid 2px black', borderRadius: '10px' }} onClick={() => { navigate('/app/foodlogmainscreen') }}  >
              <Grid item xs={5}>
                <img alt="Yellow Sneaker" src={require("../../assets/img/yellow-sneaker.png")} height="auto" width="35%" />

              </Grid>
              <Grid item xs={7}>
                <p>Excercise</p>

              </Grid>
            </Grid>

            <Grid container sx={{ border: 'solid 2px black', borderRadius: '10px' }} onClick={() => { navigate('/app/foodlogmainscreen') }}  >
              <Grid item xs={5}>
                <img alt="Blue wrist watch" src={require("../../assets/img/blue-clock.png")} height="auto" width="35%" />

              </Grid>
              <Grid item xs={7}>
                <p>Sleep</p>

              </Grid>
            </Grid>

            <Grid container sx={{ border: 'solid 2px black', borderRadius: '10px' }} onClick={() => { navigate('/app/foodlogmainscreen') }}  >
              <Grid item xs={5}>
                <img alt="White mug" src={require("../../assets/img/white-cup.png")} height="auto" width="35%" />

              </Grid>
              <Grid item xs={7}>
                <p>Water</p>

              </Grid>
            </Grid>

            <Grid container sx={{ border: 'solid 2px black', borderRadius: '10px' }} onClick={() => { navigate('/app/foodlogmainscreen') }}  >
              <Grid item xs={5}>
                <img alt="Orange Scale" src={require("../../assets/img/scale-orange.png")} height="auto" width="35%" />

              </Grid>
              <Grid item xs={7}>
                <p>Weight</p>

              </Grid>
            </Grid>
            
            


</Grid>




</Grid>
        */}

      </Modal>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarContent}
        </Alert>
      </Snackbar>

      {/* Done with daily missions backdrop */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={missionsAccomplishedOpen}
        onClick={handleMissionAccomplished}>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <img alt='Confetti' src={require('../../assets/img/3d-confetti.png')} width='200px' height='200px' margin='auto' />
          </Grid>
          <Grid item xs={12}>
            <h1>All missions completed</h1>
          </Grid>
          <Grid item xs={12}>
            <p>You're done for today. Continue logging to get more progress points</p>
          </Grid>
        </Grid>
      </Backdrop>

    </Container >



  );
};

export default Dashboard;