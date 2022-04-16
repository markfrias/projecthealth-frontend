import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { saveWeightHeightSettings } from '../auth/APIServices';
import Registration6 from '../registration/Registration6';
import Registration7 from '../registration/Registration7';
import { KeyboardArrowLeft } from '@mui/icons-material';

import Registration8 from '../registration/Registration8';

const WeightHeightMod = () => {
    const [isInvalid, setIsInvalid] = useState(false);
    const [weightHeight, setWeightHeight] = useState({ height: "", weight: "", targetWeight: "" });
    const [linkValue, setLinkValue] = useState("");
    const [buttonLabel, setButtonLabel] = useState("Next")
    const [modalHeading, setModalHeading] = useState("");
    const [modalBody, setModalBody] = useState("");
    const [open, setOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const handleChanges = (event) => {
        const target = event.target;
        setWeightHeight({
            ...weightHeight,
            [target.name]: target.value
        })
    }

    // Handle button click
    const handleButtonClick = async () => {
        console.log(weightHeight)
        const slicedPath = location.pathname.slice(14);
        if (slicedPath === "target-weight") {
            console.log(weightHeight)
            const response = await saveWeightHeightSettings(weightHeight);
            if (response === 400) {
                setModalHeading("Incomplete information")
                setModalBody("Please make sure to answer all fields.")
                setOpen(true)
            } else if (response === 500) {
                setModalHeading("Oops, server error")
                setModalBody("An error occurred on our end. Please try again soon.")
                setOpen(true)
            } else if (response === 200) {
                setModalHeading("Settings saved")
                setModalBody("Your weight and height settings have been saved successfully. You will automatically be redirected to the dashboard.")
                setOpen(true)
                setTimeout(() => {
                    navigate('/app/')
                }, (5000));

            }
        }
    }

    // Handle close of dialog
    const handleClose = () => {
        setOpen(false);
    }

    // Changes link and button label every time the url changes
    useEffect(() => {
        const slicedPath = location.pathname.slice(14);

        if (slicedPath === "weight" || slicedPath === "height") {
            setButtonLabel("Next");

            setLinkValue(
                slicedPath === "weight" ? "/app/settings/target-weight" : "/app/settings/weight"
            )

        } else {
            setButtonLabel("Save settings")
        }

    }, [location]);

    useEffect(() => {
        console.log(weightHeight)
    }, [weightHeight])




    return (
        <Grid container direction="column" justifyContent="space-between" maxWidth="md">
            <Grid item xs={12} sx={{ padding: '1em' }}
                container direction='column'
            >
                <Grid item>
                    <Button className='button-quicknote' variant='text' sx={{ color: 'black' }} startIcon={<KeyboardArrowLeft />} onClick={() => { navigate(-1) }}>Back</Button>
                </Grid>

            </Grid>
            <Routes>
                <Route path="height" element={<Registration6 handleChange={handleChanges} setState={setWeightHeight} values={weightHeight} isInvalid={isInvalid} setIsInvalid={setIsInvalid} />} />
                <Route path="weight" element={<Registration7 handleChange={handleChanges} setState={setWeightHeight} values={weightHeight} isInvalid={isInvalid} setIsInvalid={setIsInvalid} />} />
                <Route path="target-weight" element={<Registration8 handleChange={handleChanges} setState={setWeightHeight} values={weightHeight} isInvalid={isInvalid} setIsInvalid={setIsInvalid} />} />
            </Routes>
            <Button variant="contained" sx={{ mt: '5em', mx: "1em" }} component={Link} to={linkValue} onClick={handleButtonClick}>{buttonLabel}</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {modalHeading}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {modalBody}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { navigate('/app/profile') }}>Okay</Button>
                </DialogActions>
            </Dialog>

        </Grid>
    );
}

export default WeightHeightMod;
