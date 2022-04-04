import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Grid, CircularProgress, Paper } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';
import { Link } from "react-router-dom";



import { getProgressReport } from '../auth/APIServices';
import moment from 'moment';


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
  const data = [
    { weightJournalDate: 1, weight: 50 },
    { weightJournalDate: 2, weight: 250 },
    { weightJournalDate: 3, weight: 500 }

  ];


  // Chip highlighting state
  const [checked, setChecked] = useState([0]);// Chip click handler
  const handleToggle = (value) => {
    const newChecked = [];
    newChecked.push(value.logId);
    setChecked(newChecked);
  };// Chip options state
  const logTypes = [
    { logId: 0, label: "Weight" },
    { logId: 1, label: "BMI" },
    { logId: 2, label: "Calorie intake" },


  ];

  // State for this component's less changeable data
  const [lessChanging, setLessChanging] = React.useState();
  const [weightTrend, setWeightTrend] = React.useState(data);
  const [bmiTrend, setBmiTrend] = React.useState(data);
  const [calorieTrend, setCalorieTrend] = React.useState(data)


  // Loading state
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      setLoading(true)

      // Fetch progress report data
      const progressReport = await getProgressReport();
      console.log(progressReport)
      setLessChanging(progressReport[0][0]);
      const revisedWeightTrend = progressReport[1].map((data) => {
        return {
          weight: Math.round(data.weight),
          weightJournalDate: moment(data.weightJournalDate).format('MM/DD')
        }
      })
      setWeightTrend(revisedWeightTrend)

      const revisedBmiTrend = progressReport[3].map((data) => {
        return {
          bmi: Math.round(data.bmi),
        }
      })
      setBmiTrend(revisedBmiTrend);

      const revisedCalTrend = progressReport[2].map((data) => {
        return {
          calories: data.calories,
          foodJournalDate: moment(data.foodJournalDate).format('MM/DD')
        }
      })
      setCalorieTrend(revisedCalTrend);

    })()

    return () => {
      setLoading(true)

    };
  }, []);







  // Set loading state to off once less changing data and weight trends is set
  React.useEffect(() => {
    if (lessChanging !== undefined && weightTrend !== undefined && lessChanging.levelId !== undefined) {
      setLoading(false);
      console.log(weightTrend)
    } else {
      setLoading(true)
    }

    return () => {
      console.log("You passed bitch")
      setLoading(true)


    }
  }, [lessChanging, weightTrend, bmiTrend])


  return (
    <Grid container direction="column" >
      <Grid item xs={12} sx={{ background: '#F9AB10', padding: '1em' }}
        container direction='column'
      >
        <Grid item>
          <Button className='button-quicknote' variant='text' sx={{ color: 'black' }} startIcon={<KeyboardArrowLeftIcon />} component={Link} to="/app/profile">Back</Button>
        </Grid>

        <Grid item xs={12} container direction='row'>
          <Typography variant='onboardingHeader2' component='h1' >Progress report</Typography>
        </Grid>


      </Grid>

      {loading ?
        <CircularProgress variant="indeterminate" /> :
        <Grid item xs={12} container px={1} pb={3}>
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




      <Grid item xs={12} container direction='column' px={1}>
        <Typography variant='subtitle1B' component='h1' pb={1} >Trends</Typography>
        <Grid item pb={2}>
          {logTypes.map((log) => {
            return (
              <Chip sx={{ mr: '.25em' }} key={log.logId} label={log.label} onClick={(event) => { handleToggle(log) }} variant={checked.indexOf(log.logId) !== -1 ? "filled" : "outlined"} />
            )
          })}
        </Grid>



      </Grid>

      {checked[0] === 0 ?
        <Grid item xs={12} container direction='row' px={1}>
          <Paper sx={{ minHeight: "30vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {weightTrend.length === 1 ?
              <Typography component="p">Log your weight regularly to view trend.</Typography> :
              <VictoryChart theme={VictoryTheme.material} domain={{ y: [0, lessChanging.targetWeight + 20] }}
              >
                <VictoryLine
                  data={weightTrend}
                  x="weightJournalDate"
                  y="weight"
                />
              </VictoryChart>

            }
          </Paper>

        </Grid>

        :

        checked[0] === 1 ?
          <Grid item xs={12} container direction='row' px={1}>
            <Paper sx={{ minHeight: "30vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
              {bmiTrend.length <= 1 ?
                <Typography component="p">Log your weight regularly to view trend.</Typography> :
                <VictoryChart domain={{ y: [0, 40] }} theme={VictoryTheme.material}>
                  <VictoryLine
                    data={bmiTrend}
                    x=""
                    y="bmi"
                  />
                </VictoryChart>

              }
            </Paper>

          </Grid> :
          <Grid item xs={12} container direction='row' px={1}>
            <Paper sx={{ minHeight: "30vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
              {calorieTrend.length <= 1 ?
                <Typography component="p">Log your weight regularly to view trend.</Typography> :
                <VictoryChart theme={VictoryTheme.material}>
                  <VictoryLine
                    data={calorieTrend}
                    x="foodJournalDate"
                    y="calories"
                  />
                </VictoryChart>

              }
            </Paper>



          </Grid>



      }


    </Grid >



  );


};



export default ProgressReport;