import { DatePicker, LocalizationProvider } from '@mui/lab';
import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDayjs';
import { InputAdornment, TextField } from '@mui/material';
import AccessTimeRounded from '@mui/icons-material/AccessTimeRounded';

const ThemedDatePicker = (props) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>

            <DatePicker
                label={props.label || "Label"}
                value={props.value}
                onChange={(newValue) => {
                    props.setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} variant="outlined" sx={{ mb: "1.5rem", width: "100%" }} InputProps={{ endAdornment: <InputAdornment position="end" ><AccessTimeRounded /> </InputAdornment> }} />}
                shouldDisableTime={(timeValue, clockType) => {
                    if (clockType === 'minutes' && timeValue > 0) {
                        return true;
                    }

                    return false;
                }}
            />


        </LocalizationProvider>
    );
}

export default ThemedDatePicker;

