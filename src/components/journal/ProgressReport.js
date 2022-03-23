import React from 'react';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

function ClickableChips() {
    const handleClick = () => {
      console.info('You clicked the Chip.');
    };
  
    return (
      <Stack direction="row" spacing={1}>
        <Chip label="Weight" onClick={handleClick} />
        <Chip label="BMI" onClick={handleClick} />
        <Chip label="Calorie intake" onClick={handleClick} />
      </Stack>
    );
  }

function LinearDeterminate() {
    const [progress, setProgress] = React.useState(0);
  
    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);
  
      return () => {
        clearInterval(timer);
      };
    }, []);
  
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    );
  }

const ProgressReport = () => {
  return (
    <Grid container spacing={4} >
      <Grid item xs={12} className='quicknote-container1'
        container direction='column'
      >
        <Button className='button-quicknote' variant='text' sx={{ color: 'black' }} startIcon={<KeyboardArrowLeftIcon />}>Back</Button>

        <Grid item xs={12} container direction='row'>
        <Typography variant='onboardingHeader' component='h1' >Progress report</Typography>
        </Grid>

      </Grid>




        <Grid item xs={12} container direction='row'>
        <Typography variant='subtitle1B' component='h1' >How much have you progressed?</Typography>
        </Grid>

        <Grid item xs={6} container direction='row'>
        <Typography variant='subtitle1' component='h1' >Level 20</Typography>
        </Grid>
        <Grid item xs={6} container direction='row'>
        <Typography variant='subtitle1B' component='h1' >50/75</Typography>
        </Grid>
        <Grid item xs={12} container direction='row'>
        <LinearDeterminate></LinearDeterminate>
        </Grid>

        <Grid item xs={6} container direction='row'>
        <Typography variant='subtitle1' component='h1' >You've lost 0.2kg this week.</Typography>
        </Grid>
        <Grid item xs={6} container direction='row'>
        <Typography variant='subtitle1B' component='h1' >72/68kg</Typography>
        </Grid>
        <Grid item xs={12} container direction='row'>
        <LinearDeterminate></LinearDeterminate>
        </Grid>

        <Grid item xs={12} container direction='row'>
        <Typography variant='subtitle1B' component='h1' >Trends</Typography>
        <ClickableChips></ClickableChips>
        
        
        </Grid>

        
        );
     

    </Grid>



  );


};



export default ProgressReport;