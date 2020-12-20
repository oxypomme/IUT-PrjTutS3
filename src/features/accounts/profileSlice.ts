import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";

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

export interface IProfile {
    age: number,
    desc: string,
    imageURL: string,
    name: string,
    orientation: number,
    sex: number,
    tags: string[],
    town: string
}

export const profileSlice = createSlice({
    name: "profiles",
    initialState: {
        profiles: new Array<any>(),
        isWorking: false,
        error: ""
    },
    extraReducers: {
        [fetchProfiles.type]: (state) => ({
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
    }
});

export const {
    fetchProfilesSuccess,
    fetchProfilesFailed,
    createProfileSuccess,
    createProfileFailed,
    updateProfileSuccess,
    updateProfileFailed,
    deleteProfileSuccess,
    deleteProfileFailed
} = profileSlice.actions;

export const getState = state => state.tags;

export const getAllProfiles = createSelector(getState, (state) => state.profiles);

export const getProfileError = createSelector(getState, state => state.error);

export default profileSlice.reducer;