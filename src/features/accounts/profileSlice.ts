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
export const fetchArrayProfile = createAction(
    "FETCH_ARRAY_PROFILE_REQUESTED",
    (keys: number[], params = {}) => ({
        payload: {
            request: {
                type: "read",
                url: "/profiles",
                keys,
                params
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
                urlL: "/link",
                urlP: "/profiles",
                params
            }
        }
    })
)
export const createProfile = createAction(
    "CREATE_PROFILE_REQUESTED",
    (params = {}) => ({
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
            let isDuplicate = false;
            state.profiles.forEach(profile => {
                if (profile.key == newProfile.key || newProfile.key == (state.current.profile as IProfile).key) {
                    isDuplicate = true;
                }
            })

            if (!isDuplicate)
                profiles = [...state.profiles, newProfile]
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
export const getCurrProfile = createSelector(getState, state => state.current.profile)
export const getProfileError = createSelector(getState, state => state.error);

export default profileSlice.reducer;