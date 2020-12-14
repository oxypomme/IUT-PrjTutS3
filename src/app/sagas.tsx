import { call, put, takeEvery, take, cancelled, cancel, fork, takeLatest, all } from 'redux-saga/effects'

import { firebaseConfig } from './firebaseconfig';
import firebase from 'firebase/app';
import '@firebase/database'
import ReduxSagaFirebase from 'redux-saga-firebase';

export const firebaseApp = firebase.initializeApp(firebaseConfig)

export const getAsyncTags =
    async (table: string, id = 0): Promise<firebase.database.DataSnapshot> =>
        await firebase.database().ref('/' + table + (id ? '/' + id : '')).once('value');

export function* getTags() {
    const snap = yield call(getAsyncTags, 'tags', 1);
    //BUG: Don't await or just return a undefined value
    yield put({ type: "TEST_TAG_SAGA", payload: snap.val() })
}

const rsf = new ReduxSagaFirebase(firebaseApp);
export function* getTagsRSF() {
    const firstTag = yield call(rsf.database.read, '/tags/1');
    yield put({ type: "TEST_TAG_RSF", payload: firstTag })
}

function* rootSaga() {
    // https://redux-saga.js.org/
    // https://www.npmjs.com/package/redux-saga-firebase
    yield all([
        getTags()
    ]);
}

export default rootSaga;