import { createAction, createSelector, createSlice, current } from "@reduxjs/toolkit";

import IProfile from "../../include/IProfile";

export const fetchProfile = createAction(
    "FETCH_PROFILE_REQUESTED",
    (key: number, params = {}) => ({
        payload: {
            request: {
                type: "read",
                url: "/profiles",
                key,
                params
            }
        }
    })
)
export const fetchCurrProfile = createAction(
    "FETCH-CURRENT_PROFILE_REQUESTED",
    (params = {}) => ({
        payload: {
            request: {
                type: "read",
                urlL: "/link",
                urlP: "/profiles",
                params
            }
        }
    })
)
export const createProfile = createAction(
    "CREATE_PROFILE_REQUESTED",
    (params: IProfile) => ({
        payload: {
            request: {
                type: "update",
                urlP: "/profiles",
                urlL: "/link",
                params
            }
        }
    })
)
export const updateProfile = createAction(
    "EDIT_PROFILE_REQUESTED",
    (key: number, params: IProfile) => ({
        payload: {
            request: {
                type: "update",
                url: "/profiles",
                key,
                params
            }
        }
    })
)
export const deleteProfile = createAction(
    "DELETE_PROFILE_REQUESTED",
    (params: number) => ({
        payload: {
            request: {
                type: "delete",
                urlP: "/profiles",
                urlL: "/link",
                params
            }
        }
    })
)

export const profileSlice = createSlice({
    name: "profiles",
    initialState: {
        profiles: new Array<IProfile>(),
        current: {
            profile: {},
            id: -1
        },
        isWorking: false,
        error: ""
    },
    extraReducers: {
        [fetchProfile.type]: (state) => ({
            ...state,
            isWorking: true,
            error: ""
        }),
        [fetchCurrProfile.type]: (state) => ({
            ...state,
            isWorking: true,
            error: ""
        }),
        [createProfile.type]: (state) => ({
            ...state,
            isWorking: true,
            error: ""
        }),
        [updateProfile.type]: (state) => ({
            ...state,
            isWorking: true,
            error: ""
        }),
        [deleteProfile.type]: (state) => ({
            ...state,
            isWorking: true,
            error: ""
        })
    },
    reducers: {
        fetchProfilesSuccess: (state, { payload: newProfile }) => ({
            ...state,
            isWorking: false,
            error: "",
            profiles: [...state.profiles, newProfile]
        }),
        fetchProfilesFailed: (state, { payload: message }) => ({
            ...state,
            isWorking: false,
            error: message
        }),
        fetchCurrProfilesSuccess: (state, { payload }) => ({
            ...state,
            isWorking: false,
            error: "",
            current: {
                profile: payload.profile,
                id: payload.key
            }
        }),
        fetchCurrProfilesFailed: (state, { payload: message }) => ({
            ...state,
            isWorking: false,
            error: message
        }),
        createProfileSuccess: (state) => ({
            ...state,
            isWorking: false,
            error: ""
        }),
        createProfileFailed: (state, { payload: message }) => ({
            ...state,
            isWorking: false,
            error: message
        }),
        updateProfileSuccess: (state) => ({
            ...state,
            isWorking: false,
            error: ""
        }),
        updateProfileFailed: (state, { payload: message }) => ({
            ...state,
            isWorking: false,
            error: message
        }),
        deleteProfileSuccess: (state) => ({
            ...state,
            isWorking: false,
            error: ""
        }),
        deleteProfileFailed: (state, { payload: message }) => ({
            ...state,
            isWorking: false,
            error: message
        }),

        resetCurrProfile: (state) => ({
            ...state,
            isWorking: false,
            error: "",
            current: {
                profile: {},
                id: -1
            },
        }),
    }
});

export const {
    fetchProfilesSuccess,
    fetchProfilesFailed,
    fetchCurrProfilesSuccess,
    fetchCurrProfilesFailed,
    createProfileSuccess,
    createProfileFailed,
    updateProfileSuccess,
    updateProfileFailed,
    deleteProfileSuccess,
    deleteProfileFailed,

    resetCurrProfile,
} = profileSlice.actions;

export const getState = state => state.profiles;

export const getAllProfiles = createSelector(getState, state => state.profiles);
export const getCurrProfile = createSelector(getState, state => state.current.profile)
export const getCurrProfileId = createSelector(getState, state => state.current.id)
export const getProfileError = createSelector(getState, state => state.error);

export default profileSlice.reducer;