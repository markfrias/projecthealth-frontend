import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Registration6 from '../registration/Registration6';
import Registration7 from '../registration/Registration7';

const WeightHeightMod = () => {
    const [isInvalid, setIsInvalid] = useState(false);
    const [height, setHeight] = useState({ height: "" });
    const [weight, setWeight] = useState({ weight: "" });



    const handleChanges = (event) => {
        const target = event.target;
        setHeight({
            ...height,
            height: target.value
        })
        setWeight({
            ...weight,
            weight: target.value
        })
    }




    return (
        <div>
            <Routes>
                <Route path="height" element={<Registration6 handleChange={handleChanges} setState={setHeight} values={height} isInvalid={isInvalid} setIsInvalid={setIsInvalid} />} />
                <Route path="weight" element={<Registration7 handleChange={handleChanges} setState={setWeight} values={weight} isInvalid={isInvalid} setIsInvalid={setIsInvalid} />} />
            </Routes>
        </div>
    );
}

export default WeightHeightMod;
