import React from 'react';
import { Container, Button, TextField } from '@mui/material';
import { FormGroup} from '@mui/material';

import MobileStepper from '@mui/material/MobileStepper';




export default function Onboarding5() {
    
    const [activeStep] = React.useState(0);


    return (

        <Container maxWidth="md" sx={"display: flex; flex-direction: column; justify-content: space-between; min-height: 100vh"}>


            <div style={{marginTop: 180, marginLeft:5}}>
                 <h2>When were you born?</h2>
                 <p  >This information will only be used to personalize your experience.</p>
            </div>
           


            <FormGroup style={{marginBottom: 180}}>
                
                <TextField id="outlined-basic" label="Please enter your birth date." variant="outlined" />

            </FormGroup>



            <div className='button-group'>
                <MobileStepper
                    variant="progress"
                    steps={6}
                    position="static"
                    activeStep={activeStep}
                    sx={{ maxWidth: 400, flexGrow: 1 }}

                />
                <Button className="button-full" variant="contained"  >Continue</Button>
            </div>
        </Container>

    );
}

