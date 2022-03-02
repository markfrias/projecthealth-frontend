import React, { useEffect } from 'react';
import { Container, Button, Switch, Checkbox, Box, FormControl, RadioGroup, Radio } from '@mui/material';
import { FormGroup, FormControlLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Registration4 from './Registration4';
import { useNavigate } from 'react-router-dom';




export default function WeightGoals(props) {
    let navigate = useNavigate();

    return (


        < Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%", overflow: "scroll" }} >
            <div style={{ marginLeft: 10 }}>
                <h2>What are your health goals?.</h2>
                <p >We’d like to know your goals and conditions so that we can personalize the experience for you.</p>
            </div>

            <Box>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="weightGoal"
                        value={props.values.goals.weightGoal}
                        onChange={props.handleChange}
                    >
                        <FormControlLabel value="loseWeight" control={<Radio />} label="Lose weight" />
                        <FormControlLabel value="gainWeight" control={<Radio />} label="Gain weight" />
                        <FormControlLabel value="maintainWeight" control={<Radio />} label="Maintain weight" />
                    </RadioGroup>
                </FormControl>
            </Box>
        </Container >
    );
}