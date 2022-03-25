import React from 'react';
import Button from '@mui/material/Button';
import { Container, Grid } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import ListItemText from '@mui/material/IconButton';
import ReorderIcon from '@mui/icons-material/Reorder';
import { useNavigate } from 'react-router-dom';



const FoodLogMainScreen = () => {
  const navigate = useNavigate();
  return (
    <Grid container spacing={4} >
      <Grid item xs={12} className='quicknote-container1'
        container direction='column'
      >
        <Button className='button-quicknote' variant='text' sx={{ color: 'black' }} startIcon={<KeyboardArrowLeftIcon />}>Back</Button>
        <Typography variant='onboardingHeader' component='h1' >Log Food</Typography>
      </Grid>


      <Container
        sx={{
          '& > :not(style)': { m: 2, width: 300 },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid item xs={12}>
          <Typography variant='subtitle1' component='p'>How would you like to log your food?</Typography>
        </Grid>
        <Grid item xs={6} container rowSpacing={4} onClick={() => { navigate('/app/quicknote') }}>
          <img alt='Confetti' src={require('../../assets/img/note.png')} width='200px' height='200px' margin='auto' />
          <Typography variant='subtitle1B' component='h2'>Quick Note</Typography>
          <Typography variant='subtitle1' component='p' >Type away and leave for later logging.</Typography>
        </Grid>

        <Grid container spacing={4} onClick={() => { navigate('/app/food/search') }}>
          <img alt='Confetti' src={require('../../assets/img/blackman.png')} width='200px' height='200px' margin='auto' />
          <Typography variant='subtitle1B' component='h2'>Log with Details</Typography>
          <Typography variant='subtitle1' component='p'>See full details of meal and nutritional value</Typography>
        </Grid>

        <Grid>
          <Typography variant='subtitle1' component='p' >*You can choose to log your quick note later as a detailed log</Typography>


        </Grid>

      </Container>

    </Grid>



  );


}



export default FoodLogMainScreen;