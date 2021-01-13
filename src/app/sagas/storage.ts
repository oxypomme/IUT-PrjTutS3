import { eventChannel } from 'redux-saga';
import { call, put, takeLatest, take, all, select, fork, cancel, cancelled } from 'redux-saga/effects';
import { withCallback } from 'redux-saga-callback';

import { rsf } from '../firebase';

import '@firebase/storage';

import {
    cancelUpload,
    deleteAvatar,
    deleteAvatarFailed,
    deleteAvatarSuccess,
    getDlUrl,
    getDlUrlFailed,
    getDlUrlSuccess,
    getStorageError,
    isUploading,
    uploadFile,
    uploadFileFailed,
    uploadFileSuccess,
    uploadStringFile
} from '../../features/firestorage/storageSlice';

function* uploadFileSaga(action) {
    try {
        const { request } = action.payload;
        const task = rsf.storage[request.type](request.url, request.file, ...request.params);

        const channel = eventChannel(emit => task.on('state_changed', emit));

        yield take(channel);

        // Wait for upload to complete
        yield task

        yield put(getDlUrl(request.url));
        const { payload } = yield take([getDlUrlSuccess, getDlUrlFailed]);

        const urlError = yield select(getStorageError);
        if (urlError !== "") {
            throw new Error(urlError);
        }

        yield put(uploadFileSuccess({ url: request.url, dlUrl: payload }));
    } catch (error) {
        yield put(uploadFileFailed(error.message));
        //throw error;
    } finally {
        if (yield cancelled()) {
            yield put(uploadFileFailed("action cancelled"));
        }
    }
}

function* uploadFlow() {
    while (true) {
        const callAction = yield take([uploadFile.type, uploadStringFile.type]);
        const task = yield fork(uploadFileSaga, callAction);
        const action = yield take([uploadFileFailed, cancelUpload])
        if (action.type == cancelUpload.type) {
            yield cancel(task);
        }
    }
}

function* fetchDlUrl(action) {
    try {
        const { request } = action.payload;
        const dlUrl = yield call(
            rsf.storage[request.type],
            request.url,
            request.params
        );

        yield put(getDlUrlSuccess(dlUrl));
    } catch (error) {
        yield put(getDlUrlFailed(error.message));
    }
}

function* deleteAvatarSaga(action) {
    try {
        const { request } = action.payload;
        const { authId, ...params } = request.params;
        yield call(
            rsf.storage[request.type],
            request.url + '/' + authId,
            params
        );

        yield put(deleteAvatarSuccess());
    } catch (error) {
        yield put(deleteAvatarFailed(error.message));
        //throw error;
    }
}

export default function* storageSagas() {
    yield all([
        fork(uploadFlow),
        takeLatest(deleteAvatar.type, deleteAvatarSaga),
        takeLatest(getDlUrl.type, fetchDlUrl),
    ]);
}