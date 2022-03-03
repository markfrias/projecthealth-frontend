import React from 'react';
import Button from '@mui/material/Button';
import { Container, Grid } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import IconButton from '@mui/material/IconButton';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import ListItemText from '@mui/material/IconButton';
import ReorderIcon from '@mui/icons-material/Reorder';



const DetailedFoodLogScreen = () => {
    return (
        <Grid container spacing={4} >
            <Grid item xs={12} className='quicknote-container1' 
            container direction = 'column'
            >
                <Button className='button-quicknote' variant='text' sx={{color: 'black'}} startIcon={<KeyboardArrowLeftIcon/>}>Back</Button>
                <h1>Log Food</h1>
            </Grid>
    

            <Container
            sx={{
            '& > :not(style)': { m: 2, width: 300 },
            }}
            noValidate
            autoComplete="off"
            >
            <Grid item xs={12}>
                <p>How would you like to log your food?</p>
            </Grid>
            <Grid item xs={6} container rowSpacing={4}>
                <img alt='Confetti' src={require('../../assets/img/note.png')} width ='200px' height='200px' margin = 'auto'/>
                <h2>Quick Note</h2>
                <p>Type away and leave for later logging.</p>
            </Grid>

            <Grid item xs={12} container spacing={4}>
                <img alt='Confetti' src={require('../../assets/img/blackman.png')} width ='200px' height='200px' margin = 'auto'/>
                <h2>Log with Details</h2>
                <p>See full details of meal and nutritional value</p>
            </Grid>

            <Grid>
                <p>*You can choose to log your quick note later as a detailed log</p>
                <h2>Quick Add</h2>
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
            </Grid>
            
            </Container>
            
        </Grid>



    );


}



export default DetailedFoodLogScreen;