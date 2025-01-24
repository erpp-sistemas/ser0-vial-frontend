import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    map: null,
    place_active: {},
    layersActive: [],
    features_layer: [],
    coordinates: [],
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setMap: (state, action) => {
            state.map = action.payload;
        },
        setLayersActive: (state, action) => {
            state.layersActive = action.payload;
        },
        setPlaceActive: (state, action) => {
            state.place_active = action.payload;
        },
        setFeatures: (state, action) => {
            state.features_layer = action.payload
        },
        setCoordinates: (state, action) => {
            state.coordinates = action.payload
        },
    }
});

export const { setMap, setLayersActive, setPlaceActive, setFeatures, setCoordinates } = mapSlice.actions;
export default mapSlice.reducer;