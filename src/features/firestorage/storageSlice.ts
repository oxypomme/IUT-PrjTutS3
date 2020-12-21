import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";

export const uploadFile = createAction(
    "UPLOAD_FILE_REQUESTED",
    (url: string, file: any) => ({
        payload: {
            request: {
                type: "uploadFile",
                url,
                file,
                params: []
            }
        }
    })
)

export const uploadStringFile = createAction(
    "UPLOAD_STRING_FILE_REQUESTED",
    (url: string, file: string) => ({
        payload: {
            request: {
                type: "uploadString",
                url,
                file,
                params: ["data_url"]
            }
        }
    })
)

export const storageSlice = createSlice({
    name: "storage",
    initialState: {
        isWorking: false,
        error: ""
    },
    extraReducers: {
        [uploadFile.type]: (state) => ({
            ...state,
            isWorking: true,
            error: ""
        }),
    },
    reducers: {
        uploadFileSucess: (state, { payload: dlURL }) => ({
            ...state,
            isWorking: false,
            error: ""
        }),
        uploadFileFailed: (state, { payload: message }) => ({
            ...state,
            isWorking: false,
            error: message
        }),
    }
});

export const {
    uploadFileSucess,
    uploadFileFailed,
} = storageSlice.actions;

export const getState = state => state.storage;

export const getStorageError = createSelector(getState, (state) => state.error)

export default storageSlice.reducer