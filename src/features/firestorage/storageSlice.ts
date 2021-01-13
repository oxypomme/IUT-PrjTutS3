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
        uploads: new Array<{ url: string, dlUrl: string }>()
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
            uploads: [...state.uploads, upContent]
        }),
        uploadFileFailed: (state, { payload: message }) => ({
            ...state,
            isWorking: false,
            error: message
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
        isUploading: (state, { payload: UploadTask }) => ({
            ...state,
            isWorking: UploadTask
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
    isUploading
} = storageSlice.actions;

export const uploadTypes = {
    uploadFile: uploadFile,
    uploadStringFile: uploadStringFile
};

export const getState = state => state.storage;

export const getUploadedFiles = createSelector(getState, state => state.uploads);
export const getStorageError = createSelector(getState, state => state.error);
export const getStorageWorking = createSelector(getState, state => state.isWorking);

export default storageSlice.reducer;