import Button from '@mui/material/Button';
import { Grid, Typography } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'floralwhite',
  };
  
function ListDividers() {
    return (
      <List sx={style} component="nav" aria-label="mailbox folders">
        <ListItem button>
        <Typography variant='subtitle1' component='p'>Progress report</Typography>
        </ListItem>
        <Divider />
        <ListItem button divider>
        <Typography variant='subtitle1' component='p'>Settings</Typography>
        </ListItem>
        <ListItem button>
        <Typography variant='subtitle1' component='p'>Account settings</Typography>
        </ListItem>
        <Divider />
        <ListItem button>
        <Typography variant='subtitle1' component='p'>Notification settings</Typography>
        </ListItem>
        <Divider />
        <ListItem button>
        <Typography variant='subtitle1' component='p'>Goal settings</Typography>
        </ListItem>
        <Divider />
        <ListItem button>
        <Typography variant='subtitle1' component='p'>Weight and height</Typography>
        </ListItem>
        <Divider />
        <ListItem button>
          <Typography variant='profileLogout' component='p'>Logout</Typography>
        </ListItem>
      </List>
    );
  }

function LetterAvatars() {
    return (
      <Stack direction="row" spacing={2}>  
        <Avatar sx={{ bgcolor: deepOrange[500] }}>AD</Avatar>
      </Stack>
    );
  }

const Profile = () => {
  

  return (
    <Grid container spacing={4} >
      <Grid item xs={12} className='quicknote-container1'
        container direction='column'
      >
        <Button className='button-quicknote' variant='text' sx={{ color: 'black' }} startIcon={<KeyboardArrowLeftIcon />}>Back</Button>
        <Typography variant='onboardingHeader' component='h1' >Profile</Typography>
      </Grid>
        <Grid item xs={12} container direction='row'>
        <LetterAvatars></LetterAvatars>
        <Typography variant='subtitle1B' component='h1' >Ashley Dela Cruz</Typography>
        </Grid>

        <Grid item xs={12} container direction='row'>
        <Typography variant='subtitle1' component='p' >ashleycruz@newscorp.com</Typography>
        </Grid>

        <Grid item xs={12} container direction='row'>
            <ListDividers></ListDividers>
            </Grid>
        </Grid>
     

    



  );


};



export default Profile;