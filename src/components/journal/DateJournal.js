import { Chip, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ReorderIcon from '@mui/icons-material/Reorder';
import { useNavigate, useParams } from 'react-router-dom';
import { getFoodLogsPersonal } from '../auth/APIServices';
import toTitleCase from '../auth/StringServices';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import moment from 'moment';
import { ChevronRight } from '@mui/icons-material';
import FoodJournalLog from './FoodJournalLog';
import HabitJournalLog from './HabitJournalLog';




const DateJournal = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { category, year, month, day } = params;

  // Chip highlighting state
  const [checked, setChecked] = useState([0]);

  // Chip options state
  const logTypes = [
    { logId: 1, label: "Breakfast" },
    { logId: 2, label: "Lunch" },
    { logId: 3, label: "Dinner" },
    { logId: 4, label: "Snack" }
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
    console.log(params)
  }, [params])

  return (
    <div>
      <Grid container direction="column">
        <Grid item container sx={{ background: "#F9AB10", height: "4rem" }}>
          <Grid item>
            <Typography variant="subtitle1B" component="h1">Journal</Typography>
          </Grid>
        </Grid>
        <Grid item container direction="column">
          <Grid item xs={12} container direction="row" alignItems="center" justifyContent="center">
            <IconButton aria-label='left-button' onClick={handleLeft}>
              <ChevronLeftIcon />
            </IconButton>
            <Typography component="p">{moment(`${year}-${month}-${day}`).format('MMMM DD, YYYY')}</Typography>
            <IconButton aria-label='right-button' onClick={handleRight}>
              <ChevronRight />
            </IconButton>
          </Grid>
          <Grid item xs={12} rowSpacing={4}>
            {logTypes.map((log) => {
              return (
                <Chip key={log.logId} label={log.label} onClick={(event) => { handleToggle(log) }} variant={checked.indexOf(log.logId) !== -1 ? "filled" : "outlined"} />
              )
            })}
          </Grid>
        </Grid>

        {category === "food" ?
          <FoodJournalLog params={params} /> :
          /* If habit log */
          category === "habit" ?
            <HabitJournalLog params={params} /> :
            "Hello"
        }


      </Grid>
    </div>
  );
}

export default DateJournal;
