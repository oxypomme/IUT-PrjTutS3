import { eventChannel } from 'redux-saga';
import { call, put, takeLatest, take } from 'redux-saga/effects'

import { rsf } from '../firebase'
import '@firebase/storage'

import {
    uploadFile,
    uploadFileFailed,
    uploadFileSucess,
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

        yield put(uploadFileSucess(dlUrl));
    } catch (error) {
        yield put(uploadFileFailed(error.message));
    }

}

export default function* storageSagas() {
    yield takeLatest(uploadFile.type, uploadFileSaga);
    yield takeLatest(uploadStringFile.type, uploadFileSaga);
}