import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Autocomplete, CircularProgress, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { AddRounded, SearchRounded } from '@mui/icons-material';
import { getFoodAutocomplete, getFoodSearchResults } from '../auth/APIServices';
import { Box } from '@mui/system';
import { ListItemButton } from '@mui/material';


const DetailedFoodLogScreen = (props) => {
  const [resultsList, setResultsList] = useState([

  ]);


  const [autocompleteValue, setAutocompleteValue] = useState("");
  const [autoInputValue, setAutoInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultsLoading, setResultsLoading] = useState(false);

  React.useEffect(() => {
    setLoading(true);
    (async () => {
      const newOptions = await getFoodAutocomplete(autoInputValue);
      if (typeof newOptions === typeof 0 || newOptions.length === 0) {
        setLoading(false);
      } else {
        setLoading(false);
        setOptions(newOptions)
      }
    })()

  }, [autoInputValue])


  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  // Refresh results list every time an autocomplete entry is clicked
  React.useEffect(() => {
    if (autocompleteValue === "" || autocompleteValue === undefined || autocompleteValue === null) {
      setResultsList([]);
      return;
    }

    (async () => {
      setResultsLoading(true);
      setResultsList([]);
      const newOptions = await getFoodSearchResults(autoInputValue);
      setResultsList(newOptions.hints)
      setResultsLoading(false);

    })()


  }, [autocompleteValue, autoInputValue])


  const navigate = useNavigate();

  const handleSearchClick = async () => {
    if (autocompleteValue === "" && autoInputValue === "") {
      setResultsList([]);
      return;
    }

    setResultsLoading(true);
    setResultsList([]);
    const newOptions = await getFoodSearchResults(autoInputValue);
    setResultsList(newOptions.hints)
    setResultsLoading(false);
  }

  return (
    <Grid container direction="column">
      <Grid item xs={12} sx={{ background: '#F9AB10', p: "1em", mb: '2.5em' }}
        container direction='column'
      >
        <Button variant='text' sx={{ color: 'black', maxWidth: '20%', mb: '.5em' }} startIcon={<KeyboardArrowLeftIcon />} component={Link} to="/app/">Back</Button>
        <Typography variant='onboardingHeader2' component='h1' >Log with Details</Typography>
      </Grid>


      <Grid item container xs={12} sx={{ px: '1em' }} direction="column">

        <Grid item container direction="row" mb="2em"
        >
          <Grid item xs={9}>
            <Autocomplete
              open={open}
              onOpen={() => { setOpen(true) }}
              onClose={() => { setOpen(false) }}
              disablePortal
              freeSolo
              id="combo-box-demo"
              options={options}
              value={autocompleteValue}
              onChange={(event, newValue) => {
                setAutocompleteValue(newValue);

              }}
              inputValue={autoInputValue}
              onInputChange={(event, newInputValue) => {
                setAutoInputValue(newInputValue);
              }}
              renderInput={(params) => <TextField {...params} label="Search for habits" fullWidth
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }} />}
              filterOptions={(x) => x}

            />
          </Grid>
          <Grid item xs={3} >
            <Button onClick={() => { handleSearchClick() }}>
              <SearchRounded />
            </Button>

          </Grid>
        </Grid>


        <Grid>
          <Typography variant='subtitle1B' component='h2'>{resultsList.length <= 0 ? "" : "Results"}</Typography>
        </Grid>


        <List dense sx={{ width: '100%', maxWidth: '400px' }}>
          {resultsLoading ?
            <Grid container alignItems="center" mb="1em" direction="column">
              <CircularProgress variant='indeterminate' />
              <Typography variant="p">Loading results</Typography>
            </Grid>
            : <Box />}
          {resultsList.length <= 0 ?
            <Alert severity="info">Your search results will appear here.</Alert> :

            resultsList.map((value) => {
              return (
                <ListItem
                  key={value.food.foodId + (Math.random() * 20)}
                  secondaryAction={
                    <ListItemButton onClick={() => {
                      props.setMeasures(value.measures);
                      props.setFoodItem(value);
                      navigate(`/app/food/detailed-log?q=${value.food.foodId}`);
                    }}>
                      <AddRounded
                        edge="end"

                      />
                    </ListItemButton>

                  }
                  disablePadding
                >
                  <ListItemButton onClick={() => {
                    props.setMeasures(value.measures);
                    props.setFoodItem(value);
                    navigate(`/app/food/detailed-log?q=${value.food.foodId}`);
                  }}>

                    <ListItemText primary={value.food.label} secondary={value.food.nutrients.ENERC_KCAL + " calories"} />
                  </ListItemButton>
                </ListItem>
              );
            })


          }

        </List>

      </Grid>

    </Grid>



  );


};



export default DetailedFoodLogScreen;