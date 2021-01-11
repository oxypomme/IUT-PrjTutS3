import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";

export const newMatch = createAction(
    "CREATE_MATCH_REQUESTED",
    (targetId: string, isBlocked = false, params = {}) => ({
        payload: {
            request: {
                type: "create",
                url: "/matches",
                params: {
                    data: {
                        target: targetId,
                        isBlocked
                    },
                    ...params
                },
            },
        },
    })
);
export const updateMatch = createAction(
    "UPDATE_MATCH_REQUESTED",
    (matchId: string, params = {}) => ({
        payload: {
            request: {
                type: "patch",
                url: "/matches",
                params: {
                    matchId,
                    data: {
                        isBlocked: true
                    },
                    ...params
                },
            },
        },
    })
);
export const deleteMatch = createAction(
    "DELETE_MATCH_REQUESTED",
    (matchId: string, params = {}) => ({
        payload: {
            request: {
                type: "delete",
                url: "/matches",
                params: { matchId, ...params }
            }
        }
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
        [newMatch.type]: (state) => ({
            ...state,
            isWorking: true,
            error: ""
        }),
        [updateMatch.type]: (state) => ({
            ...state,
            isWorking: true,
            error: ""
        }),
        [deleteMatch.type]: (state) => ({
            ...state,
            isWorking: true,
            error: ""
        }),
    },
    reducers: {
        syncInMatchesSuccess: (state, { payload: incomingMatches }) => ({
            ...state,
            isWorking: false,
            error: "",
            incomingMatches
        }),
        syncOutMatchesSuccess: (state, { payload: matches }) => ({
            ...state,
            isWorking: false,
            error: "",
            matches
        }),
        syncMatchesFailed: (state, { payload: error }) => {
            let errorToShow = error;
            if (typeof error !== "string") {
                errorToShow = error.message;
            }

            return {
                ...state,
                isWorking: false,
                error: errorToShow
            }
        },
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
        updateMatchSuccess: (state) => ({
            ...state,
            isWorking: false,
            error: "",
        }),
        updateMatchFailed: (state, { payload: message }) => ({
            ...state,
            isWorking: false,
            error: message
        }),
        deleteMatchSuccess: (state) => ({
            ...state,
            isWorking: false,
            error: "",
        }),
        deleteMatchFailed: (state, { payload: message }) => ({
            ...state,
            isWorking: false,
            error: message
        }),
        resetMatches: (state) => ({
            ...state,
            matches: null,
            incomingMatches: null,
        })
    }
});

export const {
    createMatchSuccess,
    createMatchFailed,
    updateMatchSuccess,
    updateMatchFailed,
    deleteMatchSuccess,
    deleteMatchFailed,
    syncMatchesFailed,
    syncOutMatchesSuccess,
    syncInMatchesSuccess,
    resetMatches
} = matchSlice.actions;

export const getState = state => state.matches;

export const getOutgoingMatches = createSelector(getState, (state) => state.matches);
export const getIngoingMatches = createSelector(getState, (state) => state.incomingMatches);
export const getAllMatches = createSelector(
    getOutgoingMatches,
    getIngoingMatches,
    (outMatches, inMatches) => ({
        ...outMatches,
        ...inMatches
    }));

export const getMatchError = createSelector(getState, (state) => state.error);

export default matchSlice.reducer;