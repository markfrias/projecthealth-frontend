import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Avatar, Autocomplete, Container, CircularProgress, Grid, ListItemAvatar, ListItemButton, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ReorderIcon from '@mui/icons-material/Reorder';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { Add, AddRounded, Delete, SearchRounded } from '@mui/icons-material';
import { getFoodAutocomplete, getFoodSearchResults } from '../auth/APIServices';
import { Box } from '@mui/system';

const DetailedFoodLogScreen = (props) => {
  const [resultsList, setResultsList] = useState([

  ]);


  const [autocompleteValue, setAutocompleteValue] = useState("");
  const [autoInputValue, setAutoInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultsLoading, setResultsLoading] = useState(false);

  /*React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      // For demo purposes.
      console.log(getFoodAutocomplete(autoInputValue))

      if (active) {
        setOptions([]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);*/

  React.useEffect(() => {
    setLoading(true);
    (async () => {
      const newOptions = await getFoodAutocomplete(autoInputValue);
      console.log(newOptions);
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
      console.log(newOptions.hints)
      setResultsList(newOptions.hints)
      setResultsLoading(false);

    })()


  }, [autocompleteValue])


  const navigate = useNavigate();

  const handleSearchClick = async () => {
    if (autocompleteValue === "" && autoInputValue === "") {
      setResultsList([]);
      return;
    }

    setResultsLoading(true);
    setResultsList([]);
    const newOptions = await getFoodSearchResults(autoInputValue);
    console.log(newOptions.hints)
    setResultsList(newOptions.hints)
    setResultsLoading(false);
  }

  return (
    <Grid container spacing={4} >
      <Grid item xs={12} className='quicknote-container1'
        container direction='column'
      >
        <Button className='button-quicknote' variant='text' sx={{ color: 'black' }} startIcon={<KeyboardArrowLeftIcon />}>Back</Button>
        <Typography variant='onboardingHeader' component='h1' >Log with Details</Typography>
      </Grid>


      <Container
        sx={{
          '& > :not(style)': { m: 2, width: 300 },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container>
          <Autocomplete
            open={open}
            onOpen={() => { setOpen(true) }}
            onClose={() => { setOpen(false) }}
            disablePortal
            freeSolo
            sx={{ width: '75%' }}
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
          <Button onClick={() => { handleSearchClick() }}>
            <SearchRounded />
          </Button>








        </Grid>
        <Grid>
          <Typography variant='subtitle1B' component='h2'>{resultsList.length <= 0 ? "Quick Add" : "Results"}</Typography>
        </Grid>


        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {resultsLoading ? <CircularProgress variant='indeterminate' /> : <Box />}
          {resultsList.length <= 0 ?
            <Alert severity="info">Please create or select a habit.</Alert> :

            resultsList.map((value) => {
              return (
                <ListItem
                  key={value.food.foodId + (Math.random() * 20)}
                  secondaryAction={
                    <ListItemButton>
                      <AddRounded
                        edge="end"

                      />
                    </ListItemButton>

                  }
                  disablePadding
                >
                  <ListItemButton onClick={() => {
                    props.setMeasures(value.measures);
                    console.log(value)
                    props.setFoodItem(value);
                    navigate(`/app/food/log?q=${value.food.foodId}`);
                  }}>

                    <ListItemText primary={value.food.label} secondary={value.food.nutrients.ENERC_KCAL + " calories"} />
                  </ListItemButton>
                </ListItem>
              );
            })


          }

        </List>
        );
      </Container>

    </Grid>



  );


};



export default DetailedFoodLogScreen;