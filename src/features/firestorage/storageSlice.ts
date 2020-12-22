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
        error: "",
        uploads: new Array<{ url: string, dlUrl: string }>()
    },
    extraReducers: {
        [uploadFile.type]: (state) => ({
            ...state,
            isWorking: true,
            error: ""
        }),
    },
    reducers: {
        uploadFileSuccess: (state, { payload: upContent }) => ({
            ...state,
            isWorking: false,
            error: "",
            uploads: [...state.uploads, upContent]
        }),
        uploadFileFailed: (state, { payload: message }) => ({
            ...state,
            isWorking: false,
            error: message
        }),
    }
});

export const {
    uploadFileSuccess,
    uploadFileFailed,
} = storageSlice.actions;

export const getState = state => state.storage;

export const getUploadedFiles = createSelector(getState, state => state.uploads);
export const getStorageError = createSelector(getState, (state) => state.error)

export default storageSlice.reducer