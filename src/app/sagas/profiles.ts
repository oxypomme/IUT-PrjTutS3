import { call, put, takeLatest, take } from 'redux-saga/effects'

import { rsf } from '../firebase'
import '@firebase/database'

function* getProfiles(action?) {
    try {
        const profiles = yield call(rsf.database.read, '/profiles' + (action?.payload && typeof action.payload == 'number' ? '/' + action.payload : ''));
        yield put({ type: "FETCH_PROFILES_SUCCEED", payload: profiles });
    } catch (error) {
        yield put({ type: "FETCH_PROFILES_FAILED", payload: error.message });
    }
}

function* createProfile(action) {
    try {
        //TODO: generate key
        const key = -1;
        yield call(rsf.database.update, '/profiles/' + key, action.payload);
        /*
        action.payload = {
            mail: "",
            age: 0,
            name: "",
            tags: [0],
            orientation: 0/1/2,
            town: "",
            imageURL: ""
        }
        */
        yield put({ type: "CREATE_PROFILE_SUCCEED", payload: key });
    } catch (error) {
        yield put({ type: "CREATE_PROFILE_FAILED", payload: error.message });
    }
}

function* updateProfile(action) {
    try {
        yield call(rsf.database.update, '/profiles/' + action.key, action.payload);
        /*
        action.key = 0
        action.payload = {
            mail: "",
            age: 0,
            name: "",
            tags: [0],
            orientation: 0/1/2,
            town: "",
            imageURL: ""
        }
        */
        yield put({ type: "EDIT_PROFILE_SUCCEED", payload: {} });
    } catch (error) {
        yield put({ type: "EDIT_PROFILE_FAILED", payload: error.message });
    }
}

function* deleteProfile(action) {
    try {
        yield call(rsf.database.delete, '/profiles/' + action.payload);
        yield put({ type: "DELETE_PROFILE_SUCCEED", payload: {} });
    } catch (error) {
        yield put({ type: "DELETE_PROFILE_FAILED", payload: error.message });
    }
}

export default function* profilesSagas() {
    yield takeLatest('FETCH_PROFILES_REQUESTED', getProfiles);
    yield takeLatest('CREATE_PROFILE_REQUESTED', createProfile);
    yield takeLatest('EDIT_PROFILE_REQUESTED', updateProfile);
    yield takeLatest('DELETE_PROFILE_REQUESTED', deleteProfile);
}