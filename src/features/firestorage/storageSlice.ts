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
);
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
);
export const deleteAvatar = createAction(
    "DELETE_AVATAR_REQUESTED",
    (authId: string, params = {}) => ({
        payload: {
            request: {
                type: "deleteFile",
                url: "/profiles",
                params: { authId, ...params }
            }
        }
    })
);
export const getDlUrl = createAction(
    "FETCH_DLURL_REQUESTED",
    (url: string, params = {}) => ({
        payload: {
            request: {
                type: "getDownloadURL",
                url,
                params
            }
        }
    })
);

export const cancelUpload = createAction(
    "CANCEL_UPLOAD_REQUESTED",
    () => ({
        payload: {}
    })
);

export const storageSlice = createSlice({
    name: "storage",
    initialState: {
        isWorking: false,
        error: "",
        progress: 0
    },
    extraReducers: {
        [uploadFile.type]: (state) => ({
            ...state,
            isWorking: true,
            error: ""
        }),
        [uploadStringFile.type]: (state) => ({
            ...state,
            isWorking: true,
            error: ""
        }),
        [deleteAvatar.type]: (state) => ({
            ...state,
            isWorking: true,
            error: ""
        }),
        [getDlUrl.type]: (state) => ({
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
            progress: 0
        }),
        uploadFileFailed: (state, { payload: message }) => ({
            ...state,
            isWorking: false,
            error: message,
            progress: 0
        }),
        deleteAvatarSuccess: (state) => ({
            ...state,
            isWorking: false,
            error: ""
        }),
        deleteAvatarFailed: (state, { payload: message }) => ({
            ...state,
            isWorking: false,
            error: message
        }),
        getDlUrlSuccess: (state, { payload: url }) => ({
            ...state,
            isWorking: false,
            error: ""
        }),
        getDlUrlFailed: (state, { payload: message }) => ({
            ...state,
            isWorking: false,
            error: message
        }),
        updateProgress: (state, { payload: progress }) => ({
            ...state,
            progress
        })
    }
});

export const {
    uploadFileSuccess,
    uploadFileFailed,
    deleteAvatarSuccess,
    deleteAvatarFailed,
    getDlUrlSuccess,
    getDlUrlFailed,
    updateProgress
} = storageSlice.actions;

export const uploadTypes = {
    uploadFile: uploadFile,
    uploadStringFile: uploadStringFile
};

export const getState = state => state.storage;

export const getStorageError = createSelector(getState, state => state.error);
export const getStorageWorking = createSelector(getState, state => state.isWorking);
export const getStorageProgress = createSelector(getState, state => state.progress);

export default storageSlice.reducer;