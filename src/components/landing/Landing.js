import { Button, Container } from '@mui/material';
import React from 'react';

const Landing = () => {
    return (
        <Container maxWidth="md" sx={"display: flex; flex-direction: column; justify-content: space-between; min-height: 100vh"}>
            <div className='hero_container'>
                <img alt="Woman sitting with a dog" src={require("../../assets/img/dog_woman.png")} />
            </div>
            
            <h2>Level up your health with fun</h2>
            <div className='btn btn-primary'>Yow dream</div>

            <div className='button-group'>
            <Button className="button-full" variant="contained">Contained</Button>
            <Button className="button-full" variant="contained" color="secondary">Contained</Button>
            </div>
        </Container>
            
            

        
    );
}

export default Landing;
