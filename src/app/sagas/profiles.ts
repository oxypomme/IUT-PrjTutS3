import { call, put, takeLatest, take, select, all } from 'redux-saga/effects'

import { rsf } from '../firebase'
import '@firebase/database'

import {
    clearNewAccount,
    createAccount,
    deleteAccount,
    getAccountError,
    getAuthId,
    getInfos
} from '../../features/accounts/accountSlice';

import {
    createProfile,
    createProfileFailed,
    createProfileSuccess,
    deleteProfile,
    deleteProfileFailed,
    fetchCurrProfile,
    fetchCurrProfilesFailed,
    fetchCurrProfilesSuccess,
    fetchProfile,
    fetchArrayProfile,
    fetchProfilesFailed,
    fetchProfilesSuccess,
    updateProfile,
    updateProfileFailed,
    updateProfileSuccess
} from '../../features/accounts/profileSlice';

import { createEmailAuth } from "./auth";

function* getProfile(action) {
    try {
        const { request } = action.payload;
        const profile: [] = yield call(
            rsf.database[request.type],
            request.url + '/' + request.key,
            request.params
        );
        yield put(fetchProfilesSuccess({ ...profile, key: request.key }));
    } catch (error) {
        yield put(fetchProfilesFailed(error.message));
    }
}

function* getArrayProfile(action) {
    try {
        const { request } = action.payload;

        yield all(request.keys.map((key: number) => call(getProfile, {
            payload: {
                request: {
                    ...request,
                    key
                }
            }
        })));
    } catch (error) {
        yield put(fetchProfilesFailed(error.message));
    }
}

function* getCurrProfile(action) {
    try {
        const id = yield select(getAuthId);

        const { request } = action.payload;
        const key: string = yield call(
            rsf.database[request.type],
            request.urlL + '/' + id,
            request.params
        );
        const profile = yield call(
            rsf.database[request.type],
            request.urlP + '/' + key,
            request.params
        )
        yield put(fetchCurrProfilesSuccess({ ...profile, key: parseInt(key) }));
    } catch (error) {
        yield put(fetchCurrProfilesFailed(error.message));
    }
}

function* createProfileSaga(action) {
    try {
        yield call(createAccount);
        /* In case of emergency :

        yield call(createEmailAuth, {
            payload: {
                request: {
                    type: createAccount.type,
                    params: {}
                }
            }
        })
        
        */

        const { request } = action.payload;
        const profiles: [] = yield call(
            rsf.database.read,
            request.urlP
        );

        let key: number = profiles.length;
        for (let i = 0; i < profiles.length; i++) {
            if (profiles[i] === null) {
                key = i;
                break;
            }
        }

        const newProfile = yield select(getInfos);
        yield call(
            rsf.database[request.type],
            request.urlP + '/' + key,
            newProfile
        );

        const authid = yield select(getAuthId);
        yield call(
            rsf.database[request.type],
            request.urlL + '/' + authid,
            key.toString()
        );
        yield put(clearNewAccount());
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
    yield all([
        takeLatest(fetchProfile.type, getProfile),
        takeLatest(fetchArrayProfile.type, getArrayProfile),
        takeLatest(fetchCurrProfile.type, getCurrProfile),
        takeLatest(createProfile.type, createProfileSaga),
        takeLatest(updateProfile.type, updateProfileSaga),
        takeLatest(deleteProfile.type, deleteProfileSaga),
    ]);
}