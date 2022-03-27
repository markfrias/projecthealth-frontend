import React from 'react';
import Button from '@mui/material/Button';
import { Container, Grid } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';



const FoodLogMainScreen = () => {
  const navigate = useNavigate();
  return (
    <Grid container direction="column">
      <Grid item xs={12} sx={{ background: '#F9AB10', p: "1em", mb: '2.5em' }}
        container direction='column'
      >
        <Button variant='text' sx={{ color: 'black', maxWidth: '20%', mb: '.5em' }} startIcon={<KeyboardArrowLeftIcon />} component={Link} to="/app/">Back</Button>
        <Typography variant='onboardingHeader2' component='h1' >Log Food</Typography>
      </Grid>


      <Container


      >
        <Grid item xs={12} sx={{ mb: '1.75em' }}>
          <Typography variant='categorySubheader' component='p'>How would you like to log your food?</Typography>
        </Grid>

        <Grid item container sx={{ border: 'solid 3px olivedrab', borderRadius: '10px', p: '1em', mb: '1em' }} direction="row" onClick={() => { navigate('/app/quicknote') }} alignItems="center"  >
          <Grid item xs={5} >
            <img alt='Notebook' src={require('../../assets/img/note.png')} width='100%' height='auto' />
          </Grid>
          <Grid item xs={7} >
            <Typography variant='subtitle1B' component='h2' sx={{ width: "100%" }}>Quick Note</Typography>
            <Typography variant='subtitle1' component='p' sx={{ width: "100%" }}>Type away and leave for later logging.</Typography>
          </Grid>
        </Grid>


        <Grid item container sx={{ border: 'solid 3px olivedrab', borderRadius: '10px', p: '1em', mb: '1em' }} alignItems="center" direction="row" onClick={() => { navigate('/app/food/search') }}  >
          <Grid item xs={5} >
            <img alt='Black man taking notes' src={require('../../assets/img/blackman.png')} width='100%' height='auto' />
          </Grid>
          <Grid item xs={7} >
            <Typography variant='subtitle1B' component='h2'>Log with Details</Typography>
            <Typography variant='subtitle1' component='p'>See full details of meal and nutritional value</Typography>
          </Grid>
        </Grid>

        <Grid>
          <Typography variant='subtitle1' component='p' >*You can choose to log your quick note later as a detailed log</Typography>


        </Grid>

      </Container >

    </Grid >



  );


}



export default FoodLogMainScreen;