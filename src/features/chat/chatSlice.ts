import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: "chat",
    initialState: {
        isWorking: false,
        error: ""
    },
    extraReducers: {

    },
    reducers: {

    }
});

export const a = chatSlice.actions;

export const getState = state => state.chat;

export const getChatError = createSelector(getState, state => state.error);

export default chatSlice.reducer;