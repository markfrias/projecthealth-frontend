import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Grid, CircularProgress, Paper, Alert, TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from '@mui/material';
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

function DenseTable() {
  return (
    <TableContainer>
      <Table sx={{ width: '100%' }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>BMI</TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Below 18.5
            </TableCell>
            <TableCell align="right">Underweight</TableCell>
          </TableRow>

          <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              18.5–24.9
            </TableCell>
            <TableCell align="right">Healthy</TableCell>
          </TableRow>

          <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              25–29.9	            </TableCell>
            <TableCell align="right">Overweight</TableCell>
          </TableRow>

          <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              30 and above	            </TableCell>
            <TableCell align="right">Obese</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}



const ProgressReport = (props) => {
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
        <Grid item container xs={12} sx={{ height: '100vh' }} direction="column" justifyContent="center" alignItems="center" pt={2}  >
          <CircularProgress variant="indeterminate" sx={{ mb: '2em' }} />
          <Typography variant='body1' component="p">Loading content</Typography>
        </Grid>
        :
        <Grid item xs={12} container px={1} pb={3} mt={1}>
          <Grid item xs={12} container direction='row' mb={1}>
            <Typography variant='subtitle1B' component='h1' >How much have you progressed?</Typography>
          </Grid>

          <Grid item xs={6} container direction='row' >
            <Typography variant='subtitle1' component='h1' >Level {lessChanging.levelId}</Typography>
          </Grid>
          <Grid item xs={6} container direction='row'>
            <Typography variant='subtitle1B' component='h1' >{`PP: ${lessChanging.progressPoints}/${lessChanging.levelBoundary}`}</Typography>

          </Grid>
          <Grid item xs={12} container direction='row' mb={2}>
            <LinearProgress variant="determinate" value={lessChanging.progressPoints / lessChanging.levelBoundary * 100} sx={{ height: '1em', borderRadius: '20px', border: 'solid 2px black', width: "100%" }} color={'green'} />

          </Grid>

          <Grid item xs={12} container direction='row'>
            <Typography variant='subtitle1' component='h1' >Current: {lessChanging.currentWeight} kg | Target: {lessChanging.targetWeight} kg</Typography>
          </Grid>

        </Grid>

      }
      {
        loading ?
          "" :
          <Grid item xs={12} container direction='column' px={1}>
            <Typography variant='subtitle1B' component='h1' pb={1} >Trends</Typography>
            <Grid item pb={2}>
              {logTypes.map((log) => {
                return (
                  <Chip sx={{ mr: '.25em' }} key={log.logId} label={log.label} onClick={(event) => { handleToggle(log) }} variant={checked.indexOf(log.logId) !== -1 ? "filled" : "outlined"} />
                )
              })}
            </Grid>

            {checked[0] === 0 && lessChanging !== undefined ?
              <Grid item xs={12} container direction='row' px={1}>

                <Paper sx={{ minHeight: "30vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  {weightTrend.length === 1 ?
                    <Typography component="p">Log your weight regularly to view trend.</Typography> :
                    <VictoryChart theme={VictoryTheme.material} domain={{ y: [lessChanging.targetWeight - 10, lessChanging.targetWeight + 1] }}
                    >
                      <VictoryLine
                        data={weightTrend}
                        x="weightJournalDate"
                        y="weight"
                        interpolation="natural"
                      />
                    </VictoryChart>

                  }
                </Paper>

              </Grid>

              :

              checked[0] === 1 && lessChanging !== undefined
                ?
                <Grid item xs={12} container direction='row' px={1}>
                  <Grid item className='dashboard-container1' mb={2}>
                    <Typography variant='onboardingHeader2' component='h2' sx={{ mb: '.5em' }} >Body mass index (BMI) guide</Typography>
                    <DenseTable />

                  </Grid>
                  <Paper sx={{ minHeight: "30vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {bmiTrend.length <= 1 ?
                      <Typography component="p">Log your weight regularly to view trend.</Typography> :
                      <VictoryChart domain={{ y: [18.5, 35] }} theme={VictoryTheme.material}>
                        <VictoryLine
                          data={bmiTrend}
                          y="bmi"
                          interpolation="natural"
                        />
                      </VictoryChart>

                    }
                  </Paper>

                </Grid> :
                <Grid item xs={12} container direction='row' px={1}>
                  <Grid item xs={12} container direction="column" mb={2}>
                    <Alert severity="info">Target daily calorie budget: <strong>{lessChanging.calorieBudget}</strong> calories</Alert>
                  </Grid>
                  <Paper sx={{ minHeight: "30vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", mb: '1.5em' }}>
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





          </Grid>

      }








    </Grid >



  );


};



export default ProgressReport;