import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";
import IProfile from "../../include/IProfile";

export const fetchProfiles = createAction(
    "FETCH_PROFILES_REQUESTED",
    (params = {}) => ({
        payload: {
            request: {
                type: "read",
                url: "/profiles",
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
                url: "/link",
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
        currentId: -1,
        isWorking: false,
        error: ""
    },
    extraReducers: {
        [fetchProfiles.type]: (state) => ({
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
        fetchProfilesSuccess: (state, { payload: profiles }) => ({
            ...state,
            isWorking: false,
            error: "",
            profiles
        }),
        fetchProfilesFailed: (state, { payload: message }) => ({
            ...state,
            isWorking: false,
            error: message
        }),
        fetchCurrProfilesSuccess: (state, { payload: currentId }) => ({
            ...state,
            isWorking: false,
            error: "",
            currentId
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

        resetCurrProfile: (state) => {
            state.currentId = -1;
        }
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

    resetCurrProfile
} = profileSlice.actions;

export const getState = state => state.profiles;

export const getAllProfiles = createSelector(getState, state => state.profiles);
export const getCurrProfile = createSelector(getState, state => {
    if (state.profiles)
        return state.profiles[state.currentId];
    else
        return null;
})
export const getProfileError = createSelector(getState, state => state.error);

export default profileSlice.reducer;