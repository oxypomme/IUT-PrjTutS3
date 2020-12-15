import { call, put, takeLatest, take } from 'redux-saga/effects'

import { rsf } from '../firebase'
import '@firebase/database'

function* getProfiles(action?) {
    try {
        const profiles = yield call(rsf.database.read, '/profiles' + (action?.payload && typeof action.payload == 'number' ? '/' + action.payload : ''))
        yield put({ type: "FETCH_PROFILES_SUCCEED", payload: profiles })
    } catch (error) {
        yield put({ type: "FETCH_PROFILES_FAILED", payload: error.message })
    }
}

function* createProfile(action) {
    try {
        const key = yield call(rsf.database.create, '/profiles', action.payload)
        /*
        action.payload = {
            age: ,
            name: ,
            tags: ,
            orientation: ,
            town: ,
            imageURL: 
        }
        */
        yield put({ type: "CREATE_PROFILE_SUCCEED", payload: key });
    } catch (error) {
        yield put({ type: "CREATE_PROFILE_FAILED", payload: error.message });
    }
}

function* updateProfile(action) {
    try {
        yield call(rsf.database.update, '/profiles/' + action.key, action.payload)
        yield put({ type: "EDIT_PROFILE_SUCCEED", payload: {} })
    } catch (error) {
        yield put({ type: "EDIT_PROFILE_FAILED", payload: error.message })
    }
}

function* deleteProfile(action) {
    try {
        yield console.log("todo");
    } catch (error) {
        yield console.log("todo");
    }
}

export default function* profilesSagas() {
    yield takeLatest('FETCH_PROFILES_REQUESTED', getProfiles);
}