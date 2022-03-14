import { Chip, Grid, Typography } from '@mui/material';
import React from 'react';

const Journal = () => {
    return (
        <div>
            <Grid container direction="column">
                <Grid item container sx={{ background: "#F9AB10", height: "4rem" }}>
                    <Grid item>
                        <Typography variant="subtitle1" component="h1">Journal</Typography>
                    </Grid>
                </Grid>

                <Grid item container alignItems="center">
                    <Grid item xs={3}>
                        <img alt="Party popper" src={require('../../assets/img/3d-confetti.png')} width="100%" height="100%" />
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="subtitle1" component="h1">You fed Pobi for 3 days straight. You unlocked a new object.</Typography>
                    </Grid>
                </Grid>

                <Grid item container direction="column">
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" component="h1">Which logs are you looking for?</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Chip label="Chip Filled" />
                        <Chip label="Chip Filled" />
                        <Chip label="Chip Filled" />
                        <Chip label="Chip Filled" />
                        <Chip label="Chip Filled" />
                        <Chip label="Chip Filled" />
                        <Chip label="Chip Filled" />
                    </Grid>
                </Grid>

                <Grid item container direction="column">
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" component="h1">Which logs are you looking for?</Typography>
                    </Grid>

                    <Grid item xs={12}>

                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Journal;
