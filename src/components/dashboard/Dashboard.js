import { Button, Container, Fab, Grid, Modal, Typography } from '@mui/material';
import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Backdrop from '@mui/material/Backdrop';
import AddIcon from '@mui/icons-material/Add';
import { Navigation } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function SimpleBackdrop() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button onClick={handleToggle}>Show backdrop</Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
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
    </div>
  );
}

function JournalBackdrop() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button onClick={handleToggle}>Log</Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <img alt="Green Broccoli" src={require("../../assets/img/green-broccoli.png")} />
            <p>Food</p>
          </Grid>
          <Grid item xs={12}>
            <img alt="Yellow Sneaker" src={require("../../assets/img/yellow-sneaker.png")} />
            <p>Excercise</p>
          </Grid>
          <Grid item xs={12}>
            <img alt="Blue Clock" src={require("../../assets/img/blue-clock.png")} />
            <p>Excercise</p>
          </Grid>
          <Grid item xs={12}>
            <img alt="White Cup" src={require("../../assets/img/white-cup.png")} />
            <p>Water</p>
          </Grid>
          <Grid item xs={12}>
            <img alt="Orange Scale" src={require("../../assets/img/scale-orange.png")} />
            <p>Water</p>
          </Grid>
        </Grid>
      </Backdrop>
    </div>
  );
}


function LinearDeterminate() {
  const [progress] = React.useState(0);

  React.useEffect(() => {
    return () => {
      clearInterval();
    };
  }, []);

  return (
    <Box sx={{ width: '20%' }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}

function CheckboxListSecondary() {
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List dense sx={{ width: '100%', maxWidth: 360 }}>
      {[0, 1, 2].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem
            key={value}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(value)}
                checked={checked.indexOf(value) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>






              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [openSuccess] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  }



  return (
    <Container maxWidth="md" sx={{
      minHeight: "100vh",
      justifyContent: "space-between",
      display: "flex",
      flexDirection: "column"
    }}>
      <SimpleBackdrop></SimpleBackdrop>
      <JournalBackdrop></JournalBackdrop>
      <div className='hero_container'>
        <img alt="Dog Sitting" src={require("../../assets/img/beagle-dog-sitting.png")} />
        <LinearDeterminate></LinearDeterminate>

      </div>


      <div className='dashboard-container1'>
        <Typography variant='subtitle1B' component='h2' >Tip</Typography>
        <Typography variant='subtitle1' component='p'>Increase progress points and unlock new characteers and stickers by accomplishing
          a mission or logging your food/habit/activity.</Typography>
      </div>
      <div>
        <Button variant='contained' sx={{ color: 'black' }} startIcon={<AddIcon />} >Log</Button>
      </div>
      <div className='dashboard-container2'>
        <Typography variant='subtitle1B' component='h1'>Daily Missions</Typography>
        <CheckboxListSecondary>

        </CheckboxListSecondary>





      </div>
      <div className='button-group'>

      </div>
      <Fab variant="extended" sx={{ position: "fixed", bottom: '1em', right: '1em' }} onClick={() => { setOpen(true) }}>
        <Navigation />
        Navigate
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

      <Modal
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "rgba(249, 171, 16, .16)" }}
        open={open}
        /*onClick={handleClose}*/ >
        <Grid container spacing={2} sx={{ height: '100%', overflow: "scroll" }}>
          <Grid item xs={10} sx={{
            width: '100%', height: 'auto'
          }}>
            <Grid container sx={{ border: 'solid 2px black', borderRadius: '10px' }} onClick={() => { navigate('/app/foodlogmainscreen') }}  >
              <Grid item xs={5}>
                <img alt="Green Broccoli" src={require("../../assets/img/green-broccoli.png")} height="auto" width="35%" />

              </Grid>
              <Grid item xs={7}>
                <p>Food</p>

              </Grid>
            </Grid>

          </Grid>
          <Grid item xs={12}>
            <img alt="Yellow Sneaker" src={require("../../assets/img/yellow-sneaker.png")} />
            <p>Excercise</p>
          </Grid>
          <Grid item xs={12}>
            <img alt="Blue Clock" src={require("../../assets/img/blue-clock.png")} />
            <p>Excercise</p>
          </Grid>
          <Grid item xs={12}>
            <img alt="White Cup" src={require("../../assets/img/white-cup.png")} />
            <p>Water</p>
          </Grid>
          <Grid item xs={12}>
            <img alt="Orange Scale" src={require("../../assets/img/scale-orange.png")} />
            <p>Water</p>
          </Grid>
        </Grid>
      </Modal>

    </Container >



  );
};

export default Dashboard;