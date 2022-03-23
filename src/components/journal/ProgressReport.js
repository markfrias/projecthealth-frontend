import React from 'react';
import Button from '@mui/material/Button';
import { Grid, CircularProgress } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { getProgressReport } from '../auth/APIServices';

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

function LinearDeterminate(props) {

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    console.log(props.numerator / props.denominator * 100)
    setProgress(props.numerator / props.denominator * 100)

    return () => {
    };
  }, [props]);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}

const ProgressReport = () => {

  // State for this component's less changeable data
  const [lessChanging, setLessChanging] = React.useState();

  // Loading state
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      // Fetch progress report data
      const progressReport = await getProgressReport();
      console.log(progressReport)
      setLessChanging(progressReport[0][0]);
    })()



    return () => {

    };
  }, []);

  // Set loading state to off once less changing data is set
  React.useEffect(() => {
    if (lessChanging !== undefined) {
      setLoading(false);
    }

  }, [lessChanging])


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

      {loading ?
        <CircularProgress variant="indeterminate" /> :
        <Grid item xs={12} container>
          <Grid item xs={12} container direction='row'>
            <Typography variant='subtitle1B' component='h1' >How much have you progressed?</Typography>
          </Grid>

          <Grid item xs={6} container direction='row'>
            <Typography variant='subtitle1' component='h1' >Level {lessChanging.levelId}</Typography>
          </Grid>
          <Grid item xs={6} container direction='row'>
            <Typography variant='subtitle1B' component='h1' >{`PP: ${lessChanging.progressPoints}/${lessChanging.levelBoundary}`}</Typography>
          </Grid>
          <Grid item xs={12} container direction='row'>
            <LinearDeterminate numerator={lessChanging.progressPoints} denominator={lessChanging.levelBoundary}></LinearDeterminate>
          </Grid>

          {lessChanging.weightLoss > 0 ?
            <Grid item xs={6} container direction='row'>
              <Typography variant='subtitle1' component='h1' >You've lost {lessChanging.weightLoss} kg this week.</Typography>
            </Grid>
            :

            lessChanging.weightLoss < 0 ?
              <Grid item xs={6} container direction='row'>
                <Typography variant='subtitle1' component='h1' >You've gained {lessChanging.weightLoss * (-1)} kg this week.</Typography>
              </Grid> :
              <Grid item xs={6} container direction='row'>
                <Typography variant='subtitle1' component='h1' >You've maintained your weight this week.</Typography>
              </Grid>

          }

          <Grid item xs={6} container direction='row'>
            <Typography variant='subtitle1B' component='h1' >Current: {lessChanging.currentWeight} kg | Target: {lessChanging.targetWeight} kg</Typography>
          </Grid>

          {lessChanging.weightLoss > 0 ?
            <Grid item xs={12} container direction='row'>
              <LinearDeterminate numerator={lessChanging.targetWeight - lessChanging.minWeight} denominator={lessChanging.targetWeight - lessChanging.currentWeight}></LinearDeterminate>

            </Grid>
            :

            lessChanging.weightLoss < 0 ?
              <Grid item xs={12} container direction='row'>
                <LinearDeterminate numerator={lessChanging.maxWeight - lessChanging.targetWeight} denominator={lessChanging.currentWeight - lessChanging.targetWeight}></LinearDeterminate>

              </Grid> :
              <Grid item xs={12} container direction='row'>
                <LinearDeterminate></LinearDeterminate>
              </Grid>

          }




        </Grid>

      }




      <Grid item xs={12} container direction='row'>
        <Typography variant='subtitle1B' component='h1' >Trends</Typography>
        <ClickableChips></ClickableChips>


      </Grid>


      );


    </Grid>



  );


};



export default ProgressReport;