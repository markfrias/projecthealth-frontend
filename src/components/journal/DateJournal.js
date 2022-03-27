import { Button, Chip, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { useNavigate, useParams } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import moment from 'moment';
import { ChevronRight, KeyboardArrowLeftRounded } from '@mui/icons-material';
import FoodJournalLog from './FoodJournalLog';
import HabitJournalLog from './HabitJournalLog';
import { Link } from 'react-router-dom';




const DateJournal = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { category, year, month, day } = params;

  // Chip highlighting state
  const [checked, setChecked] = useState([]);

  // Chip options state
  const logTypes = [
    { logId: 0, label: "Food" },
    { logId: 1, label: "Habits" },

  ];

  // Navigates the user to the previous day's log
  const handleLeft = () => {
    const yesterday = moment(`${year}-${month}-${day}`).subtract(1, 'days');
    navigate(`/app/journal-log/${category}/${yesterday.format('YYYY')}/${yesterday.format('MM')}/${yesterday.format('DD')}`);
  }

  // Navigates the user to the previous day's log
  const handleRight = () => {
    const yesterday = moment(`${year}-${month}-${day}`).add(1, 'days');
    navigate(`/app/journal-log/${category}/${yesterday.format('YYYY')}/${yesterday.format('MM')}/${yesterday.format('DD')}`);
  }

  // Chip click handler
  const handleToggle = (value) => {
    const newChecked = [];
    newChecked.push(value.logId);
    setChecked(newChecked);
  };

  useEffect(() => {
    try {
      console.log(params.category)
      setChecked([parseInt(params.category)]);
      // Change highlighted chip on change of category url
    } catch (error) {
      navigate('/app/journal');
    }

    // Fix this useEffect thing later
    // eslint-disable-next-line
  }, [params.category])

  useEffect(() => {
    if (checked.length > 0) {
      navigate(`/app/journal-log/${checked[0]}/${year}/${month}/${day}`)
    }
    // Fix this useEffect thing later
    // eslint-disable-next-line
  }, [checked])

  // Cleanup
  useEffect(() => {
    return () => {
      setChecked();
    }
  }, [])


  return (
    <div>
      <Grid container direction="column">
        < Grid item xs={12}
          container direction='column' sx={{ background: '#F9AB10', p: '1em', mb: '1em' }
          }
        >

          <Button variant='text' sx={{ color: 'black', maxWidth: '20%', mb: '.5em' }} startIcon={<KeyboardArrowLeftRounded />} component={Link} to="/app/">Back</Button>
          <Typography variant='onboardingHeader2' component='h1' >Log Food</Typography>
        </Grid>


        <Grid item container direction="column" px={1} justifyContent="center" alignItems="center">
          <Grid item xs={12} container direction="row" alignItems="center" justifyContent="center" mb={2}>
            <IconButton aria-label='left-button' onClick={handleLeft}>
              <ChevronLeftIcon />
            </IconButton>
            <Typography variant="p" sx={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#624100' }} >{moment(`${year}-${month}-${day}`).format('MMMM DD, YYYY')}</Typography>
            <IconButton aria-label='right-button' onClick={handleRight}>
              <ChevronRight />
            </IconButton>
          </Grid>
          <Grid item xs={12} rowSpacing={4} mb={3}>
            {logTypes.map((log) => {
              return (
                <Chip key={log.logId} label={log.label} onClick={(event) => { handleToggle(log) }} variant={checked.indexOf(log.logId) !== -1 ? "filled" : "outlined"} />
              )
            })}
          </Grid>
        </Grid>

        {category === "0" ?
          <FoodJournalLog params={params} sx={{ px: '1em' }} /> :
          /* If habit log */
          category === "1" ?
            <HabitJournalLog params={params} sx={{ px: '1em' }} /> :
            "Hello"
        }


      </Grid>
    </div>
  );
}

export default DateJournal;
