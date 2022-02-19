import { ThemeProvider } from '@emotion/react';
import { Button, Container, createTheme, OutlinedInput, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDayjs';
import { MobileTimePicker, TimePicker } from '@mui/lab';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';


const Notificationsetup = () => {

    const [breakfastValue, setBreakfastValue] = React.useState('Sat Feb 19 2022 17:00:00 GMT+0800 (Philippine Standard Time)');
    const [lunchValue, setLunchValue] = React.useState('Sat Feb 19 2022 17:00:00 GMT+0800 (Philippine Standard Time)');
    const [dinnerValue, setDinnerValue] = React.useState('Sat Feb 19 2022 17:00:00 GMT+0800 (Philippine Standard Time)');




    useEffect(() => {
        console.log(dinnerValue)

    }, [dinnerValue]);
    return (
        <div>
            <Container sx={{ paddingTop: "3em" }}>
                <Typography variant='bigHeading' component="h1" sx={{ mb: '2.5rem' }}>Don't forget to log your meals</Typography>
                <Container sx={{ height: '100%', width: '40%', mx: 0, mb: '2.5rem' }}>
                    <img src={require('../../assets/img/alarm_clock.png')} height="100%" width="100%" />
                </Container>

                <Typography variant="subtitle1" component="h2" sx={{ mb: '0.75rem' }}><strong>When</strong> do you want to be reminded? </Typography>
                <Typography variant="subtitle1" component="h2" sx={{ mb: '3rem' }}>For now, notifications can only be customized by <strong>hour</strong>.</Typography>


                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileTimePicker
                        label="Breakfast"
                        value={breakfastValue}
                        onChange={(newValue) => {
                            setBreakfastValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} variant="outlined" sx={{ mb: "1.5rem", width: "100%" }} />}
                        shouldDisableTime={(timeValue, clockType) => {
                            if (clockType === 'minutes' && timeValue > 0) {
                                return true;
                            }

                            return false;
                        }}
                    />

                    <MobileTimePicker
                        label="Lunch"
                        value={lunchValue}
                        onChange={(newValue) => {
                            setLunchValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} variant="outlined" sx={{ mb: "1.5rem", width: "100%" }} />}
                        shouldDisableTime={(timeValue, clockType) => {
                            if (clockType === 'minutes' && timeValue > 0) {
                                return true;
                            }

                            return false;
                        }}
                    />

                    <MobileTimePicker
                        label="Dinner"
                        value={dinnerValue}
                        onChange={(newValue) => {
                            setDinnerValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} variant="outlined" sx={{ mb: "1.5rem", width: "100%" }} />}
                        shouldDisableTime={(timeValue, clockType) => {
                            if (clockType === 'minutes' && timeValue > 0) {
                                return true;
                            }

                            return false;
                        }}
                    />
                </LocalizationProvider>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant='contained' disableElevation>

                        Continue
                        <NavigateNextRoundedIcon />
                    </Button>
                </Box>

            </Container>


        </div>
    );
}

export default Notificationsetup;
