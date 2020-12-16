import { eventChannel } from 'redux-saga';
import { call, put, takeLatest, take } from 'redux-saga/effects'

import { rsf } from '../firebase'
import '@firebase/storage'

function* uploadFile(action) {
    try {
        const task = rsf.storage.uploadFile(action.path, action.file);

        const channel = eventChannel(emit => task.on('state_changed', emit));

        yield take(channel);

        // Wait for upload to complete
        yield task

        const dlUrl = yield call(rsf.storage.getDownloadURL, action.path);

        yield put({ type: "UPLOAD_FILE_SUCCEED", payload: dlUrl });
    } catch (error) {
        yield put({ type: "UPLOAD_FILE_FAILED", payload: error.message });
    }

}

export default function* storageSagas() {
    yield takeLatest('UPLOAD_FILE_REQUESTED', uploadFile);
}