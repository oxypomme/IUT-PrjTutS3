import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";

import IProfile from "../../include/IProfile";

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
/**
 * Only used for type reference.
 * 
 * Must have this payload :
 * request: { type: "update", url: "/profiles", params: {} }
 */
export const createProfile = createAction("CREATE_PROFILE_REQUESTED");

export const updateProfile = createAction(
    "EDIT_PROFILE_REQUESTED",
    (profile: IProfile, params = {}) => ({
        payload: {
            request: {
                type: "update",
                url: "/profiles",
                params: { ...profile, ...params }
            }
        }
    })
);
export const deleteProfile = createAction(
    "DELETE_PROFILE_REQUESTED",
    (authId: string, params = {}) => ({
        payload: {
            request: {
                type: "delete",
                urls: ["/profiles", "/matchs"],
                params: { authId, ...params }
            }
        }
    })
);

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
            const profiles = [...state.profiles];

            for (let i = 0; i < state.profiles.length; i++) {
                const profile = state.profiles[i];

                if (profile.authId == newProfile.authId || newProfile.authId == (state.current.profile as IProfile).authId) {
                    profiles.splice(i, 1);
                }
            }

            return {
                ...state,
                isWorking: false,
                error: "",
                profiles: [...profiles, newProfile]
            }
        },
        fetchProfilesFailed: (state, { payload: message }) => ({
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

export default profileSlice.reducer;