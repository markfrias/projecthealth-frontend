import React from 'react';
import Button from '@mui/material/Button';
import { Container, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ReorderIcon from '@mui/icons-material/Reorder';

const FoodLogScreen = () => {
    return (
        <Grid container spacing={4} >
            <Grid item xs={12} className='quicknote-container1' 
            container direction = 'column'
            >
                <Button className='button-quicknote' variant='text' sx={{color: 'black'}} startIcon={<KeyboardArrowLeftIcon/>}>Back</Button>
                <h1>Log with Details</h1>
            </Grid>
    

            <Container
            sx={{
            '& > :not(style)': { m: 2, width: 300 },
            }}
            noValidate
            autoComplete="off"
            >
                <Grid >
                    <TextField id="outlined-size-small" size='small' label="Search for food, meal, or drink" variant="outlined" />
                </Grid>
                <Grid>
                    <p>Quick Add</p>
                </Grid>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {[1, 2, 3].map((value) => (
        <ListItem
          key={value}
          disableGutters
          secondaryAction={
            <IconButton>
              <ReorderIcon />
            </IconButton>
          }
        >
          <ListItemText primary={`Line item ${value}`} />
        </ListItem>
      ))}
    </List>
  );
            </Container>
            
        </Grid>



    );
          

};



export default FoodLogScreen;