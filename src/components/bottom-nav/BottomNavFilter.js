import { AccountCircleRounded, BookRounded, HomeRounded, NoteRounded } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const BottomNavFilter = () => {
    const [value, setValue] = useState(0);

    return (
        <Box sx={{ pb: '5em' }}>
            <Outlet />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue)
                    }}

                >

                    <BottomNavigationAction label="Dashboard" icon={<HomeRounded />} component={Link} to="/app/" />
                    <BottomNavigationAction label="Journal" icon={<NoteRounded />} component={Link} to="/app/journal" />
                    <BottomNavigationAction label="Habits" icon={<BookRounded />} component={Link} to="/app/habitscreen" />
                    <BottomNavigationAction label="Profile" icon={<AccountCircleRounded />} component={Link} to="/app/profile" />

                </BottomNavigation>
            </Paper>
        </Box>
    );
}

export default BottomNavFilter;
