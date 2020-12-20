import { call, put, takeLatest, take, select } from 'redux-saga/effects'

import { rsf } from '../firebase'
import firebase from 'firebase/app'
import '@firebase/database'

import { deleteAccount, getAccountError, getAuthId } from '../../features/accounts/accountSlice';
import { deleteAuth } from './auth';
import {
    createProfile,
    createProfileFailed,
    createProfileSuccess,
    deleteProfile,
    deleteProfileFailed,
    fetchCurrProfile,
    fetchCurrProfilesFailed,
    fetchCurrProfilesSuccess,
    fetchProfiles,
    fetchProfilesFailed,
    fetchProfilesSuccess,
    getAllProfiles,
    getProfileError,
    updateProfile,
    updateProfileFailed,
    updateProfileSuccess
} from '../../features/accounts/profileSlice';

function* getProfiles(action) {
    try {
        const { request } = action.payload;
        const profiles = yield call(
            rsf.database[request.type],
            request.url,
            request.params
        );
        yield put(fetchProfilesSuccess(profiles));
    } catch (error) {
        yield put(fetchProfilesFailed(error.message));
    }
}

function* getCurrProfile(action) {
    try {
        const id = yield select(getAuthId);

        const { request } = action.payload;
        const profile = yield call(
            rsf.database[request.type],
            request.url + '/' + id,
            request.params
        );
        yield put(fetchCurrProfilesSuccess(profile));
    } catch (error) {
        yield put(fetchCurrProfilesFailed(error.message));
    }
}

function* createProfileSaga(action) {
    try {
        yield call(fetchProfiles);
        const profileError = yield select(getProfileError);
        if (profileError !== "")
            throw new Error(profileError);
        const profiles = yield select(getAllProfiles);

        let key = profiles.length;
        for (let i = 0; i < profiles.length; i++) {
            if (profiles[i] === null) {
                key = i;
                break;
            }
        }

        const { request } = action.payload;
        yield call(
            rsf.database[request.type],
            request.urlP + '/' + key,
            request.params
        );

        const authid = yield select(getAuthId);
        yield call(
            rsf.database[request.type],
            request.urlL + '/' + key,
            authid
        );
        yield put(createProfileSuccess());
    } catch (error) {
        yield put(createProfileFailed(error.message));
    }
}

function* updateProfileSaga(action) {
    try {
        const { request } = action.payload;
        yield call(
            rsf.database[request.type],
            request.url + '/' + request.key,
            request.params);
        yield put(updateProfileSuccess());
    } catch (error) {
        yield put(updateProfileFailed(error.message));
    }
}

function* deleteProfileSaga(action) {
    try {
        yield call(deleteAccount);
        const accountError = yield select(getAccountError);
        if (accountError !== "") {
            throw new Error(accountError);
        }

        const authid = yield select(getAuthId);
        const { request } = action.payload;
        yield call(
            rsf.database[request.type],
            request.urlP + '/' + request.params
        );
        yield call(
            rsf.database[request.type],
            request.urlL + '/' + authid
        );
        yield put(createProfileSuccess());
    } catch (error) {
        yield put(deleteProfileFailed(error.message));
    }
}

export default function* profilesSagas() {
    yield takeLatest(fetchProfiles.type, getProfiles);
    yield takeLatest(fetchCurrProfile.type, getCurrProfile);
    yield takeLatest(createProfile.type, createProfileSaga);
    yield takeLatest(updateProfile.type, updateProfileSaga);
    yield takeLatest(deleteProfile.type, deleteProfileSaga);
}