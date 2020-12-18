import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";

export interface ITag { value: string, label: string; }

const mapping = (array: string[]): ITag[] =>
    array.map((label, key) => ({
        value: key.toString(),
        label
    }));

export const fetchTags = createAction(
    "FETCH_TAGS_REQUESTED",
    (params = {}) => ({
        payload: {
            request: {
                type: "read",
                url: "/tags",
                params,
            },
        },
    })
);

export const tagSlice = createSlice({
    name: 'tags',
    initialState: {
        tags: new Array<ITag>(),
        isFetching: false,
        isError: ""
    },
    extraReducers: {
        [fetchTags.type]: (state) => ({
            ...state,
            isFetching: true,
        }),
    },
    reducers: {
        fetchTagsSuccess: (state, { payload: tags }) => ({
            ...state,
            isFetching: false,
            isError: "",
            tags,
        }),
        fetchTagsFailed: (state, { payload: message }) => ({
            ...state,
            isFetching: false,
            isError: message
        }),
    }
});

export const { 
    fetchTagsSuccess, 
    fetchTagsFailed
} = tagSlice.actions;

export const getState = state => state.tags;

export const getAllTags = createSelector(getState, (state) =>
    state.tags.map((tag, key) => ({ value: key, label: tag }))
);

export default tagSlice.reducer;

