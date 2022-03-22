import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Registration6 from '../registration/Registration6';

const WeightHeightMod = () => {
    const [isInvalid, setIsInvalid] = useState(false);
    const [weightHeight, setWeightHeight] = useState({ height: "" });



    const handleChanges = (event) => {
        const target = event.target;
        setWeightHeight({
            ...weightHeight,
            height: target.value
        })
    }




    return (
        <div>
            <Routes>
                <Route path="height" element={<Registration6 handleChange={handleChanges} setState={setWeightHeight} values={weightHeight} isInvalid={isInvalid} setIsInvalid={setIsInvalid} />} />
            </Routes>
        </div>
    );
}

export default WeightHeightMod;
