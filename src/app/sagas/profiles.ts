import { call, put, takeLatest, take, select, all, fork } from 'redux-saga/effects'
import { withCallback } from 'redux-saga-callback';

import { rsf } from '../firebase'
import '@firebase/database'

import {
    createAccount,
    createAccountFailed,
    createAccountSuccess,
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
    updateProfileSuccess,
    deleteProfileSuccess
} from '../../features/accounts/profileSlice';

import {
    fetchArrayTag,
    fetchTagsFailed,
    fetchTagSuccess,
    getTagError
} from '../../features/accounts/tagSlice';

function* getProfile(action) {
    try {
        const { request } = action.payload;
        const { authId, ...params } = request.params;

        const profile = yield call(
            rsf.database[request.type],
            request.url + '/' + authId,
            params
        );
        yield put(fetchProfilesSuccess({ ...profile, authId }));

        yield put(fetchArrayTag(profile.tags));
        yield take([fetchTagSuccess, fetchTagsFailed]);
        const tagError = yield select(getTagError);
        if (tagError != "") {
            throw new Error(tagError);
        }
    } catch (error) {
        yield put(fetchProfilesFailed(error.message));
    }
}

function* getArrayProfile(action) {
    try {
        const { request } = action.payload;
        const { authIds, ...params } = request.params;

        for (let i = 0; i < authIds.length; i++) {
            const authId = authIds[i];
            yield put(fetchProfile(authId, params));
            yield take([fetchProfilesSuccess, fetchProfilesFailed]);
        }
    } catch (error) {
        yield put(fetchProfilesFailed(error.message));
    }
}

function* getCurrProfile(action) {
    try {
        const authId = yield select(getAuthId);

        const { request } = action.payload;
        const profile = yield call(
            rsf.database[request.type],
            request.url + '/' + authId,
            request.params
        )
        yield put(fetchCurrProfilesSuccess({ ...profile, authId }));

        yield put(fetchArrayTag(profile.tags));
        yield take([fetchTagSuccess, fetchTagsFailed]);
        const tagError = yield select(getTagError);
        if (tagError != "") {
            throw new Error(tagError);
        }
    } catch (error) {
        yield put(fetchCurrProfilesFailed(error.message));
    }
}

function* createProfileSaga(action) {
    try {
        yield put(createAccount());
        yield take([createAccountSuccess, createAccountFailed]);

        const authError = yield select(getAccountError);
        if (authError != "") {
            throw new Error(authError);
        }

        const { request } = action.payload;
        const authid = yield select(getAuthId);
        const newProfile = yield select(getInfos);
        yield call(
            rsf.database[request.type],
            request.url + '/' + authid,
            { ...newProfile, ...request.params }
        );

        yield put(createProfileSuccess());
    } catch (error) {
        yield put(createProfileFailed(error.message));
        throw error;
    }
}

function* updateProfileSaga(action) {
    try {
        const { request } = action.payload;
        const authid = yield select(getAuthId);
        yield call(
            rsf.database[request.type],
            request.url + '/' + authid,
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

        const authId = yield select(getAuthId);
        const { request } = action.payload;
        for (let i = 0; i < request.urls.length; i++) {
            yield call(
                rsf.database[request.type],
                request.urls[i] + '/' + authId,
                request.params
            );
        }

        yield put(deleteProfileSuccess());
    } catch (error) {
        yield put(deleteProfileFailed(error.message));
    }
}

export default function* profilesSagas() {
    yield all([
        takeLatest(fetchProfile.type, getProfile),
        takeLatest(fetchArrayProfile.type, getArrayProfile),
        takeLatest(fetchCurrProfile.type, getCurrProfile),
        takeLatest(createProfile.type, withCallback(createProfileSaga)),
        takeLatest(updateProfile.type, updateProfileSaga),
        takeLatest(deleteProfile.type, deleteProfileSaga),
    ]);
}