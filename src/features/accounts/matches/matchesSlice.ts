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
export const newMatch = createAction(
    "CREATE_MATCH_REQUESTED",
    (targetId: string, params = {}) => ({
        payload: {
            request: {
                type: "update",
                url: "/matches",
                params: {
                    targetId,
                    data: {
                        isBlocked: false
                    },
                    ...params
                },
            },
        },
    })
);

export const matchSlice = createSlice({
    name: 'matches',
    initialState: {
        matches: null,
        incomingMatches: null,
        isWorking: false,
        error: ""
    },
    extraReducers: {
        [fetchMatches.type]: (state) => ({
            ...state,
            isWorking: true,
            error: ""
        }),
        [newMatch.type]: (state) => ({
            ...state,
            isWorking: true,
            error: ""
        }),
    },
    reducers: {
        fetchMatchesSuccess: (state, { payload: matches }) => {
            const { incomingMatches, outgoingMatches } = matches;
            return {
                ...state,
                isWorking: false,
                error: "",
                matches: outgoingMatches,
                incomingMatches
            }
        },
        fetchMatchesFailed: (state, { payload: message }) => ({
            ...state,
            isWorking: false,
            error: message
        }),
        createMatchSuccess: (state) => ({
            ...state,
            isWorking: false,
            error: "",
        }),
        createMatchFailed: (state, { payload: message }) => ({
            ...state,
            isWorking: false,
            error: message
        }),
    }
});

export const {
    fetchMatchesSuccess,
    fetchMatchesFailed,
    createMatchSuccess,
    createMatchFailed,
} = matchSlice.actions;

export const getState = state => state.matches;

export const getOutgoingMatches = createSelector(getState, (state) => state.matches);
export const getIngoingMatches = createSelector(getState, (state) => state.incomingMatches);

export const getMatchError = createSelector(getState, (state) => state.error);

export default matchSlice.reducer;