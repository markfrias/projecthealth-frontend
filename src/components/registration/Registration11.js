import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Typography } from '@mui/material';

export default function Registration11(props) {
    const handleClose = () => {
        props.setOpen(false);
    }
    return (
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%", pt: '1em' }}>
            <Box sx={{ textAlign: "center", mb: "5rem" }}>
                <Typography variant="onboardingHeader" component="h1" sx={{ mb: "1rem", width: '100%', px: '1em' }}>Register your account</Typography>
            </Box>
            <Box
                sx={{
                    width: "100%"
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    label="Password"
                    name="password1"
                    type="password"
                    value={props.values.password1}
                    onChange={props.handleChange}
                    sx={{ width: "100%", mb: "1.5rem" }}

                />
                <TextField
                    label="Confirm password"
                    name="password2"
                    type="password"
                    value={props.values.password2}
                    onChange={props.handleChange}
                    sx={{ width: "100%", mb: "1rem" }}
                />


            </Box>

            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.dialogHead}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.dialogBody}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Okay</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}