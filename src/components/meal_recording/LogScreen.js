import React from 'react';
import Button from '@mui/material/Button';
import { Container, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import ListItemText from '@mui/material/IconButton';
import ReorderIcon from '@mui/icons-material/Reorder';



const LogScreen = () => {
    return (
        <Grid container spacing={4} >
            <Grid item xs={12} className='quicknote-container1' 
            container direction = 'column'
            >
                <Button className='button-quicknote' variant='text' sx={{color: 'black'}} startIcon={<KeyboardArrowLeftIcon/>}>Back</Button>
                
                <Container>
                <h1>Beef Lasagna</h1>
                <Button color='secondary' className='button-foodlog' variant='contained'>Save</Button>
                </Container>
            </Grid>
    

            <Container
            sx={{
            '& > :not(style)': { m: 2, width: 300 },
            }}
            noValidate
            autoComplete="off"
            >
            <Grid item xs={12}>
               
            </Grid>
            <Grid item xs={6} container rowSpacing={4}>
                <img alt='Confetti' src={require('../../assets/img/sideview-beagle.png')} width ='200px' height='200px' margin = 'auto'/>
                
                <p>Please stop eating already</p>
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



export default LogScreen;