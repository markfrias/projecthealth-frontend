import { Button, Container, } from '@mui/material';
import { Switch } from '@mui/material';
import React from 'react';
/*import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';*/

/* function ProgressMobileStepper() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    return (
      <MobileStepper
        variant="progress"
        steps={6}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: 400, flexGrow: 1 }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    );
    }
    */
const Onboarding1 = () => {
    return (
        <Container maxWidth="md" sx={{minHeight: "100vh", 
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column"}}>

            <div>
                <h1 className='text-onboarding1'>Don't forget to log your meals</h1>
            </div>

            <div className='hero_container'>
                <img alt="Alarm Clock" src={require("../../assets/img/alarm_clock.png")} />
            </div>

            <div>
                <p>By turning on reminders, you'll be able to consistently track how you eat.</p>
            </div>

            <div className='switch_with_text'>
                <p>Enable meal reminders</p>
                <Switch className='switch-onboarding1' />
            </div>

            <div className='button-group'>
            <Button className="button-onboarding" variant="contained">Continue</Button>
            </div>
            {/*<ProgressMobileStepper></ProgressMobileStepper>*/}
        </Container>
            
            

        
    );
    }
 
export default Onboarding1;
