import Button from '@mui/material/Button';
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getLevelCountries } from '../auth/APIServices';
import { Box } from '@mui/system';
import { Close, Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';



const Passport = (props) => {
    // Loading state
    const [loading, setLoading] = useState(true);

    // Navigate
    const navigate = useNavigate();

    useEffect(() => {
        if (props.levels === undefined) {
            setLoading(true);
            // Fetch levels and flag urls
            (async () => {
                const countries = await getLevelCountries();
                props.setLevels(countries);

                // Fix issue with hooks warning
            })()
        }

    }, [])

    useEffect(() => {
        console.log(props.levels)
        if (props.levels !== undefined) {
            setLoading(false);
            console.log(props.levels)
        }
    }, [props.levels])

    return (
        <Box className="passport-container">
            <Grid container direction="column" minHeight="100vh" sx={{ backdropFilter: 'blur(5px)' }}>
                <Grid item container direction="row" alignItems="center" p={2} pt={2} mb={2}>
                    <Grid item xs={9}>
                        <Typography variant="onboardingHeader2" component="h1">Passport</Typography  >
                    </Grid>

                    <Grid item container justifyContent="flex-end" xs={3}>
                        <IconButton onClick={() => { navigate(-1) }}>
                            <Close sx={{ color: 'black' }} />
                        </IconButton>
                    </Grid>

                </Grid>

                {loading
                    ?
                    <Grid item container direction="column" xs={12} justifyContent="center" alignItems="center" px={2}>
                        <CircularProgress variant='indeterminate' />

                    </Grid>
                    :
                    <Grid item container direction="column" px={2} >
                        {props.levels.map((level, index) => {
                            return <Grid key={level.levelId} item container direction="row" alignItems="center" mb={1}>
                                {props.account.levelId >= (index + 1) ?
                                    <Grid item xs={4}>
                                        <img alt={`${level.levelCountry} flag`} src={level.countryImg} />
                                    </Grid> :
                                    <Grid item xs={4}>
                                        <Lock sx={{ width: '65px', height: '65px' }} />
                                    </Grid>
                                }

                                {level.levelCountry !== null
                                    ?
                                    <Grid item xs={8}>
                                        <Typography variant="categorySubheader" sx={{ color: 'black' }} component="p">{level.levelCountry}</Typography>
                                    </Grid>
                                    :
                                    <Grid item xs={8}>
                                        <Typography variant="categorySubheader" sx={{ color: 'black' }} component="p">New countries coming soon!</Typography>
                                    </Grid>
                                }

                            </Grid>
                        })}

                    </Grid>
                }

            </Grid >
        </Box>

    );


};



export default Passport;