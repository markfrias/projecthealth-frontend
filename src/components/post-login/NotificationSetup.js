import { ThemeProvider } from '@emotion/react';
import { Button, Container, createTheme, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDayjs';
import { MobileTimePicker, TimePicker } from '@mui/lab';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import AccessTimeRounded from '@mui/icons-material/AccessTimeRounded';
import ThemedTimePicker from '../ThemedTimePicker/ThemedTimePicker';
import { convertDatesToStrings } from './timeConverter';
import moment from 'moment';


const Notificationsetup = () => {

    const [breakfastValue, setBreakfastValue] = React.useState(new Date('2018-01-01T00:00:00.000Z'));
    const [lunchValue, setLunchValue] = React.useState(new Date('Sat Feb 19 2022 17:00:00 GMT+0800 (Philippine Standard Time)'));
    const [dinnerValue, setDinnerValue] = React.useState(new Date('Sat Feb 19 2022 17:00:00 GMT+0800 (Philippine Standard Time)'));

    // Convert time to string that can be sent to the server
    const handleSubmission = () => {
        // Array parameter should only accept array if this was a TypeScript project 🤡

        // Put values in an array
        const dates = [breakfastValue, lunchValue, dinnerValue];
        console.log(moment(new Date(breakfastValue)).format("HH"))
        convertDatesToStrings(dates);

    }


    useEffect(() => {
        console.log(dinnerValue)

    }, [dinnerValue]);
    return (
        <div>
            <Container sx={{ paddingTop: "3em", minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='bigHeading' component="h1" sx={{ mb: '2.5rem' }}>Don't forget to log your meals</Typography>
                    <Container sx={{ height: '100%', width: '40%', mx: 0, mb: '2.5rem' }}>
                        <img src={require('../../assets/img/alarm_clock.png')} height="100%" width="100%" />
                    </Container>

                    <Typography variant="subtitle1" component="h2" sx={{ mb: '0.75rem' }}><strong>When</strong> do you want to be reminded? </Typography>
                    <Typography variant="subtitle1" component="h2" sx={{ mb: '3rem' }}>For now, notifications can only be customized by <strong>hour</strong>.</Typography>


                    <ThemedTimePicker value={breakfastValue} setValue={setBreakfastValue} label="Breakfast" />
                    <ThemedTimePicker value={lunchValue} setValue={setLunchValue} label="Lunch" />
                    <ThemedTimePicker value={dinnerValue} setValue={setDinnerValue} label="Dinner" />

                </Box>


                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant='contained' disableElevation sx={{ minWidth: '50%' }} onClick={handleSubmission}>

                        Continue
                        <NavigateNextRoundedIcon />
                    </Button>
                </Box>

            </Container>


        </div>
    );
}

export default Notificationsetup;
