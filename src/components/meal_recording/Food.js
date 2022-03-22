import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import DetailedFoodLogScreen from './DetailedFoodLogScreen';
import LogScreen from './LogScreen';

const Food = () => {
    const [measures, setMeasures] = useState();
    const [foodItem, setFoodItem] = useState();

    return (
        <Routes>
            <Route path="search" element={<DetailedFoodLogScreen setMeasures={setMeasures} measures={measures} setFoodItem={setFoodItem} />} />
            <Route path="log" element={<LogScreen measures={measures} foodItem={foodItem} />} />
        </Routes>
    );
}

export default Food;
