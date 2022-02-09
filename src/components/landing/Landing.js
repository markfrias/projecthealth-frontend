import { Button } from '@mui/material';
import React from 'react';

const Landing = () => {
    return (
        <div className="container">
            <div className='hero_container'>
                <img alt="Woman sitting with a dog" src={require("../../assets/img/dog_woman.png")} />
            </div>
            
            <h2>Level up your health with fun</h2>

            <div className='button-group'>
            <Button className="button-full" variant="contained">Contained</Button>
            <Button className="button-full" variant="contained" color="secondary">Contained</Button>
            </div>
            

        </div>
    );
}

export default Landing;
