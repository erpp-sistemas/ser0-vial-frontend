import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import mapReducer from './mapSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        map: mapReducer
    },
})