import { configureStore } from '@reduxjs/toolkit';
import scheduleReducer from './scheduleSlice';

export default function () {
    return configureStore({
        reducer: {
            schedule: scheduleReducer,
        },
    });
}