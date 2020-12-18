import { createSlice } from "@reduxjs/toolkit";

export interface ITag { value: string, label: string; }

export const tagSlice = createSlice({
    name: 'tags',
    initialState: {
        tags: new Array<ITag>()
    },
    reducers: {
        dummy: (state) => {
            console.log(state);
        }
    },
    extraReducers: {}
});

export const { dummy } = tagSlice.actions;

export const getState = state => state.tags;

export default tagSlice.reducer;

