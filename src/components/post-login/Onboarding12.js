import { Button, Container } from '@mui/material';
import React from 'react';

const Onboarding12 = () => {
    return (
        <Container maxWidth="md" sx={"display: flex; flex-direction: column; justify-content: space-between; min-height: 100vh"}>

            <div className="header" style={{marginTop: 180}}>
                <h2 style={{fontSize:35}} >You’re all set!</h2>
                <p style={{fontSize:20}}>You can now proceed to login.</p>

             </div>
            <img alt="Success"  src={require("../../assets/img/success.png")} />
            <div className='button-group'>
                <Button className="button-full" variant="contained">Login</Button>

            </div>
           
        </Container>




    );
}

export default Onboarding12;
