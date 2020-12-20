import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";

export interface ITag { value: string, label: string; }

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
        tags: new Array<string>(),
        isFetching: false,
        error: ""
    },
    extraReducers: {
        [fetchTags.type]: (state) => ({
            ...state,
            isFetching: true,
            error: ""
        }),
    },
    reducers: {
        fetchTagsSuccess: (state, { payload: tags }) => ({
            ...state,
            isFetching: false,
            error: "",
            tags,
        }),
        fetchTagsFailed: (state, { payload: message }) => ({
            ...state,
            isFetching: false,
            error: message
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

export const getTagError = createSelector(getState, (state) => state.error);

export default tagSlice.reducer;

