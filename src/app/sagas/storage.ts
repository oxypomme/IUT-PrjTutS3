import { eventChannel } from 'redux-saga';
import { call, put, takeLatest, take, all } from 'redux-saga/effects'
import { withCallback } from 'redux-saga-callback';

import { rsf } from '../firebase'
import '@firebase/storage'

import {
    deleteAvatar,
    deleteAvatarFailed,
    deleteAvatarSuccess,
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

        const dlUrl = yield call(rsf.storage.getDownloadURL, request.url);

        yield put(uploadFileSuccess({ url: request.url, dlUrl }));
    } catch (error) {
        yield put(uploadFileFailed(error.message));
        //throw error;
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
        takeLatest([uploadFile.type, uploadStringFile.type], uploadFileSaga),
        takeLatest(deleteAvatar.type, deleteAvatarSaga),
    ]);
}