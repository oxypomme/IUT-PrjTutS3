import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";

import IProfile from "../../include/IProfile";
import TCallback from "../../include/TCallback";
import TCustomAction from "../../include/TCustomAction";

export const fetchProfile = createAction(
    "FETCH_PROFILE_REQUESTED",
    (authId: string, params = {}) => ({
        payload: {
            request: {
                type: "read",
                url: "/profiles",
                params: { authId, ...params }
            }
        }
    })
);
export const fetchArrayProfile = createAction(
    "FETCH_ARRAY_PROFILE_REQUESTED",
    (authIds: string[], params = {}) => ({
        payload: {
            request: {
                type: "read",
                url: "/profiles",
                params: { authIds, ...params }
            }
        }
    })
);
export const fetchCurrProfile = createAction(
    "FETCH-CURRENT_PROFILE_REQUESTED",
    (params = {}) => ({
        payload: {
            request: {
                type: "read",
                url: "/profiles",
                params
            }
        }
    })
);

export const createProfile = (onComplete?: TCallback, params = {}): TCustomAction => ({
    type: createProfile.type,
    payload: {
        request: {
            type: "update",
            url: "/profiles",
            params
        }
    },
    onComplete
})
createProfile.type = "CREATE_PROFILE_REQUESTED";

export const updateProfile = (onComplete?: TCallback, params = {}): TCustomAction => ({
    type: updateProfile.type,
    payload: {
        request: {
            type: "patch",
            url: "/profiles",
            params: { ...params }
        }
    },
    onComplete
});
updateProfile.type = "EDIT_PROFILE_REQUESTED";

export const deleteProfile = (onComplete?: TCallback, params = {}): TCustomAction => ({
    type: deleteProfile.type,
    payload: {
        request: {
            type: "delete",
            urls: ["/profiles", "/matches", "/messages"],
            params
        }
    },
    onComplete
});
deleteProfile.type = "DELETE_PROFILE_REQUESTED";

export const profileSlice = createSlice({
    name: "profiles",
    initialState: {
        profiles: new Array<IProfile>(),
        current: {
            profile: {}
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
        [fetchArrayProfile.type]: (state) => ({
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
        fetchProfilesSuccess: (state, { payload: newProfile }) => {
            let profiles = [...state.profiles];

            if (profiles.findIndex(val => val.authId === newProfile.authId) === -1) {
                profiles = [...profiles, newProfile]
            }

            return {
                ...state,
                isWorking: false,
                error: "",
                profiles
            }
        },
        fetchProfilesFailed: (state, { payload: message }) => ({
            ...state,
            isWorking: false,
            error: message
        }),
        fetchArrayProfilesSuccess: (state, { payload: newProfiles }) => {
            let profiles = [...state.profiles];

            newProfiles.forEach(newProfile => {
                if (profiles.findIndex(val => val.authId === newProfile.authId) === -1) {
                    profiles = [...profiles, newProfile]
                }
            });

            return {
                ...state,
                isWorking: false,
                error: "",
                profiles
            }
        },
        fetchArrayProfilesFailed: (state, { payload: message }) => ({
            ...state,
            isWorking: false,
            error: message
        }),
        fetchCurrProfilesSuccess: (state, { payload: profile }) => ({
            ...state,
            isWorking: false,
            error: "",
            current: {
                profile
            }
        }),
        fetchCurrProfilesFailed: (state, { payload: message }) => ({
            ...state,
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
        resetProfiles: (state) => ({
            ...state,
            isWorking: false,
            error: "",
            profiles: []
        }),
        resetCurrProfile: (state) => ({
            ...state,
            isWorking: false,
            error: "",
            current: {
                profile: {}
            },
        }),
    }
});

export const {
    fetchProfilesSuccess,
    fetchProfilesFailed,
    fetchCurrProfilesSuccess,
    fetchCurrProfilesFailed,
    fetchArrayProfilesSuccess,
    fetchArrayProfilesFailed,
    createProfileSuccess,
    createProfileFailed,
    updateProfileSuccess,
    updateProfileFailed,
    deleteProfileSuccess,
    deleteProfileFailed,
    resetProfiles,
    resetCurrProfile,
} = profileSlice.actions;

export const getState = state => state.profiles;

export const getAllProfiles = createSelector(getState, state => state.profiles);
export const getCurrProfile = createSelector(getState, state => state.current.profile);
export const getProfileError = createSelector(getState, state => state.error);
export const getProfileWork = createSelector(getState, state => state.isWorking);

export default profileSlice.reducer;