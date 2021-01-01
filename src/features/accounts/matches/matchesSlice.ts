import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";

export const fetchMatches = createAction(
    "FETCH_MATCHES_REQUESTED",
    (params = {}) => ({
        payload: {
            request: {
                type: "read",
                url: "/matches",
                params,
            },
        },
    })
);

export const matchSlice = createSlice({
    name: 'matches',
    initialState: {
        matches: new Array<string>(),
        isFetching: false,
        error: ""
    },
    extraReducers: {
        [fetchMatches.type]: (state) => ({
            ...state,
            isFetching: true,
            error: ""
        }),
    },
    reducers: {
        fetchMatchesSuccess: (state, { payload: matches }) => ({
            ...state,
            isFetching: false,
            error: "",
            matches,
        }),
        fetchMatchesFailed: (state, { payload: message }) => ({
            ...state,
            isFetching: false,
            error: message
        }),
    }
});

export const {
    fetchMatchesSuccess,
    fetchMatchesFailed
} = matchSlice.actions;

export const getState = state => state.matches;

export const getAllMatches = createSelector(getState, (state) => state.matches);

export const getMatchError = createSelector(getState, (state) => state.error);

export default matchSlice.reducer;