import { call, put, takeLatest, take } from 'redux-saga/effects'

import { rsf } from '../firebase'
import '@firebase/database'

function* getTags(action?) {
    try {
        const tags = yield call(rsf.database.read, '/tags' + (action?.payload && typeof action.payload == 'number' ? '/' + action.payload : ''));
        yield put({ type: "FETCH_TAGS_SUCCEED", payload: tags });
    } catch (error) {
        yield put({ type: "FETCH_TAGS_FAILED", payload: error.message });
    }
}

export default function* tagsSagas() {
    yield takeLatest('FETCH_TAGS_REQUESTED', getTags);
}