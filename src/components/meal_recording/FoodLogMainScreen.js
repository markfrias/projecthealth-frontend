import React from 'react';
import Button from '@mui/material/Button';
import { Container, Grid } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';



const FoodLogMainScreen = () => {
  const navigate = useNavigate();
  return (
    <Grid container spacing={4} >
      <Grid item xs={12} className='quicknote-container1'
        container direction='column'
      >
        <Button className='button-quicknote' variant='text' sx={{ color: 'black' }} startIcon={<KeyboardArrowLeftIcon />} component={Link} to="/app/">Back</Button>
        <Typography variant='onboardingHeader2' component='h1' >Log Food</Typography>
      </Grid>


      <Container
        sx={{
          '& > :not(style)': { m: 2, width: 350 },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid item xs={12}>
          <Typography variant='subtitle1' component='p'>How would you like to log your food?</Typography>
        </Grid>
        <Grid container sx={{ border: 'solid 3px olivedrab', borderRadius: '10px' }} onClick={() => { navigate('/app/quicknote') }}  >
        <Grid item xs={6} >
          <img alt='Notebook' src={require('../../assets/img/note.png')} width='200px' height='200px' margin='auto' />
          </Grid>
          <Grid item xs={3} >
          <Typography variant='subtitle1B' component='h2'>Quick Note</Typography>
          </Grid>
          <Grid item xs={3} >
          <Typography variant='subtitle1' component='p' >Type away and leave for later logging.</Typography>
          </Grid>
        </Grid>

        
        <Grid container sx={{ border: 'solid 3px olivedrab', borderRadius: '10px' }} onClick={() => { navigate('/app/food/search') }}  >
          <Grid item xs={6} >
          <img alt='Black man taking notes' src={require('../../assets/img/blackman.png')} width='200px' height='200px' margin='auto' />
          </Grid>
          <Grid item xs={3} >
          <Typography variant='subtitle1B' component='h2'>Log with Details</Typography>
          </Grid>
          <Grid item xs={3} >
          <Typography variant='subtitle1' component='p'>See full details of meal and nutritional value</Typography>
          </Grid>
        </Grid>

        <Grid>
          <Typography variant='subtitle1' component='p' >*You can choose to log your quick note later as a detailed log</Typography>


        </Grid>

      </Container>

    </Grid>



  );


}



export default FoodLogMainScreen;