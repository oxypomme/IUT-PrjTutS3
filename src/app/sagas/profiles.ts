import { call, put, takeLatest, take, select } from 'redux-saga/effects'

import { rsf } from '../firebase'
import '@firebase/database'

import { deleteAccount, getAuthId } from '../../features/accounts/accountSlice';
import { deleteAuth } from './auth';

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
        const profiles = yield call(getProfiles);
        if (profiles.type === "FETCH_PROFILES_FAILED")
            throw new Error(profiles.payload);

        let key = profiles.payload.length;
        for (let i = 0; i < profiles.payload.length; i++) {
            if (profiles.payload[i] === null) {
                key = i;
                break;
            }
        }

        yield call(rsf.database.update, '/profiles/' + key, action.payload);
        /*
        action.payload = {
            age: 0,
            desc: "",
            imageURL: "",
            name: "",
            orientation: 0/1/2,
            tags: [0],
            town: ""
        }
        */
        const authid = yield select(getAuthId);
        yield call(rsf.database.update, '/link/' + key, authid);
        yield put({ type: "CREATE_PROFILE_SUCCEED", payload: {} });
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
            age: 0,
            desc: "",
            imageURL: "",
            name: "",
            orientation: 0/1/2,
            tags: [0],
            town: ""
        }
        */
        yield put({ type: "EDIT_PROFILE_SUCCEED", payload: {} });
    } catch (error) {
        yield put({ type: "EDIT_PROFILE_FAILED", payload: error.message });
    }
}

function* deleteProfile(action) {
    try {
        const res = yield call(deleteAccount);
        if (res.type === "DELETE_AUTH_FAILED") {
            throw new Error(res.payload);
        }

        yield call(rsf.database.delete, '/profiles/' + action.payload);
        yield call(rsf.database.delete, '/link/' + action.payload);
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