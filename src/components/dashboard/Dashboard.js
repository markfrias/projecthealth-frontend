import { Alert, CircularProgress, Fab, Grid, IconButton, Modal, Snackbar, Typography } from '@mui/material';
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
import { addHp, addPp, pickMeme } from '../auth/GamificationAPI';

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
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [snackbarContent, setSnackbarContent] = useState("");
  const [missionsAccomplishedOpen, setMissionsAccomplishedOpen] = useState(false);

  // State for modal content
  const [dialogHead, setDialogHead] = useState();
  const [dialogBody, setDialogBody] = useState();

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
      return;
    }

    props.setChecked(newChecked);
    // Send request to server to change the status in the DB
    const body = { missionEntryId: value, missionAccomplished: status };

    // Make missions accomplished backdrop appear when all three checkboxes are checked
    if (props.checked.length === 2 && status === 1 && (props.pp + 5) / props.ppBoundary * 100 < 100) {
      setMissionsAccomplishedOpen(true);

      if ((props.pp + 10) / props.ppBoundary * 100 >= 100) {
        // Save old level
        const oldLevel = props.account.levelId;

        props.setAccount({
          ...props.account,
          levelId: props.account.levelId + 1
        })
        //console.log((props.pp + 10) - props.ppBoundary)
        props.setPp((props.pp + 10) - props.ppBoundary);
        //console.log(props.ppBoundary + 5)
        addHp(props.hp + 5);
        props.setHp(props.hp + 5);

        props.setPpBoundary(props.ppBoundary + 5)
        setDialogHead('Your pet leveled up');
        setDialogBody('Graaape, see dashboard to see where to go next 🍇🍇🍇.')
        setOpenSuccess(true);

        addPp((props.pp + 10) - props.ppBoundary, props.ppBoundary, oldLevel + 1)
        addHp(props.hp + 3);
        props.setHp(props.hp + 3);
        //console.log(props.hp)

        const response = await saveMissionStatus(body);
        //console.log(response)

        if (response === 500) {
          setSnackbarContent("An error occurred on our end. Please try again soon.")
          setSnackbarOpen(true)
        }

        return


      }
      props.setPp(props.pp + 5, props.ppBoundary)
      addPp(props.pp + 5, props.ppBoundary, props.account.levelId)
      addHp(props.hp + 5);
      props.setHp(props.hp + 5);

    }



    if (status === 1) {
      // Level up if pp expands beyond boundary
      if ((props.pp + 5) / props.ppBoundary * 100 >= 100) {
        // Save old level
        const oldLevel = props.account.levelId;

        props.setAccount({
          ...props.account,
          levelId: props.account.levelId + 1
        })
        //console.log((props.pp + 5) - props.ppBoundary)
        props.setPp((props.pp + 5) - props.ppBoundary);
        //console.log(props.ppBoundary + 5)

        props.setPpBoundary(props.ppBoundary + 5)
        setDialogHead('Your pet leveled up');
        setDialogBody("Graaape. Your pet's health increased. See dashboard to see where to go next 🍇🍇🍇.")
        setOpenSuccess(true);

        addPp((props.pp + 5) - props.ppBoundary, props.ppBoundary, oldLevel + 1);

        // Add to HP
        addHp(props.hp + 3);
        props.setHp(props.hp + 3);

        const response = await saveMissionStatus(body);
        //console.log(response)

        if (response === 500) {
          setSnackbarContent("An error occurred on our end. Please try again soon.")
          setSnackbarOpen(true)
        } else if (response === 200) {
          if (status === 1) {
            setSnackbarContent("😁😁😁 Pobi received 5 progress points. Good job!")
            setSnackbarOpen(true)

          } else {
            setSnackbarContent("😭😭😭 Pobi got deducted 5 progress points. Don't make him sad.")
            setSnackbarOpen(true)

          }

        }

        return


      }
      props.setPp(props.pp + 5, props.ppBoundary)
      addPp(props.pp + 5, props.ppBoundary, props.account.levelId)

    } else {
      if (props.pp > 4) {
        props.setPp(props.pp - 5)
        addPp(props.pp - 5, props.ppBoundary, props.account.levelId)
      }


    }


    const response = await saveMissionStatus(body);
    //console.log(response)

    if (response === 500) {
      setSnackbarContent("An error occurred on our end. Please try again soon.")
      setSnackbarOpen(true)
    } else if (response === 200) {
      if (status === 1) {
        setSnackbarContent("😁😁😁 Pobi received 5 progress points. Good job!")
        setSnackbarOpen(true)

      } else {
        setSnackbarContent("😭😭😭 Pobi got deducted 5 progress points. Don't make him sad.")
        setSnackbarOpen(true)

      }

    }


  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  }

  const handleMissionAccomplished = () => {
    setMissionsAccomplishedOpen(false);
  }

  useEffect(() => {
    if (props.missions.length === 0) {
      (async () => {
        // On render get missions
        const newMissions = await getMissions();
        //console.log(newMissions);

        props.setMissions(newMissions[0]);
        //console.log(newMissions)

        // Set checkboxes
        const newChecked = [];
        newMissions[0].forEach((mission) => {
          if (mission.missionAccomplished === 1) {
            newChecked.push(mission.missionEntryId);
          }
        });
        props.setChecked(newChecked);
        props.setAccount(newMissions[1][0])

        // Set HP and PP
        props.setHp(newMissions[1][0].healthPoints);
        props.setPp(newMissions[1][0].progressPoints);
        props.setPpBoundary(newMissions[1][0].levelBoundary);

        //console.log(newMissions[1][0])
      })()
    }

  }, [props]);

  return (
    <Grid container maxWidth="md" sx={{
      minHeight: "100vh",
      justifyContent: "space-between",
      display: "flex",
      flexDirection: "column",
      pb: '3.75rem',
      pt: '2em',
      px: '1em',
      gap: '1em'
    }}>


      <Grid item xs={12} container direction="row">
        <Grid item xs={6}>
          <img alt="Dog Sitting" src={require("../../assets/img/beagle-dog-sitting.png")} height="100%" width="100%" />
        </Grid>
        {props.pp === null ?
          <Grid item xs={6} container sx={{ width: '100%' }} direction="column" justifyContent="center" alignItems="center">
            <CircularProgress variant='indeterminate' sx={{ mb: '1rem' }} ></CircularProgress>
            <Typography variant="p">Loading content</Typography>
          </Grid>

          :

          <Grid item xs={6} container>
            <Grid item xs={12}>
              <Typography variant='subtitle1B' component='h1' sx={{ width: '100%' }} >😇 Feeling great</Typography>
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
              <LinearDeterminate numerator={props.pp} denominator={props.ppBoundary} type="pp"></LinearDeterminate>
            </Grid>
            <Grid item xs={6} >
              <Typography variant='subtitle1B' component='h1' sx={{ width: "100%" }} >{props.pp}/{props.ppBoundary}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='subtitle1B' component='h1' sx={{ width: "100%" }} >Level {props.account.levelId}</Typography>
            </Grid>

          </Grid>
        }

      </Grid>

      {/* 
         <Grid item>
        <Alert severity='success'>
          A new feature has arrived. Your actions will now count towards the progress points of your pet. Complete your missions, habits, and log your meals to make progress.
        </Alert>
      </Grid>
      */}

      <div className='dashboard-container2'>
        <Box sx={{ backdropFilter: 'blur(3px)', width: '100%', height: '100%', borderRadius: '20px', padding: '1em' }}>
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
                        disabled={props.checked.indexOf(value.missionEntryId) !== -1 ? true : false}
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
        </Box>

      </div>


      <div className='dashboard-container1'>
        <Typography variant='onboardingHeader2' component='h2' sx={{ mb: '.5em' }} >Where to next?</Typography>
        <Typography variant='onboardingSubheader2' component='p' sx={{ width: '100%' }}>{props.account.levelPrompt} <strong>Level up</strong> to get that ticket and complete the stamp collection.</Typography>
      </div>

      <div className='dashboard-container1'>
        <Typography variant='onboardingHeader2' component='h2' >Tip</Typography>
        <Typography variant='onboardingSubheader2' component='p'>Increase progress points and level up by accomplishing
          a mission or logging your food/habit/activity.</Typography>
      </div>



      <Fab variant="extended" color="primary" sx={{ position: "fixed", bottom: '5em', right: '1em' }} onClick={() => { /*setOpen(true)*/ navigate('/app/foodlogmainscreen') }}>
        <AddIcon />
        Feed your pet
      </Fab>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, p: 2 }}
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

      </Modal>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarContent}
        </Alert>
      </Snackbar>

      {/* Done with daily missions backdrop */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: 'blur(5px)' }}
        open={missionsAccomplishedOpen}
        onClick={handleMissionAccomplished}>

        <Grid container spacing={2} px={3} >

          <Grid item xs={12}>
            <div sx={{ width: '100%', height: '0', paddingBottom: '80%', position: 'relative' }}><iframe title="gif" src={`https://giphy.com/embed/${pickMeme('success')}`} width="100%" height="100%" sx={{ position: "absolute" }} frameBorder="0" className="giphy-embed" allowFullScreen></iframe></div>
          </Grid>
          <Grid item xs={12}>
            <h1>All missions completed</h1>
          </Grid>

          <Grid item xs={12}>
            <p>10 progress points closer to your next destination. Continue logging to unlock new countries.</p>
          </Grid>
        </Grid>
      </Backdrop>

    </Grid >



  );
};

export default Dashboard;