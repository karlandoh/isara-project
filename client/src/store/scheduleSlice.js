import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getScheduleAPI, changeScheduleAPI } from '../api/index.js'

export const getSchedule = createAsyncThunk('schedule/getSchedule', async () => {
    const response = await getScheduleAPI();
    return response.data;
  });

export const changeSchedule = createAsyncThunk('schedule/getSchedule', async (formData) => {
const response = await changeScheduleAPI(formData);
return response.data;
});  

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    data: null, 
    isLoading: false,
    error: null,
},
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSchedule.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSchedule.fulfilled, (state, action) => {
                const { _id, __v, ...rest } = action.payload;
                state.data = rest;
                state.isLoading = false;
            })
            .addCase(getSchedule.rejected, (state, action) => {
                state.error = action.error.message;
                state.isLoading = false;
            });
    },
});

export const {  } = scheduleSlice.actions;

export default scheduleSlice.reducer;