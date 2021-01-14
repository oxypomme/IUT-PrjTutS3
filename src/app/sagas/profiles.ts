import { channel } from 'redux-saga';
import { call, put, takeLatest, take, select, all, fork } from 'redux-saga/effects'
import { withCallback } from 'redux-saga-callback';

import { rsf } from '../firebase'
import '@firebase/database'

import {
    clearNewAccount,
    createAccount,
    createAccountFailed,
    createAccountSuccess,
    deleteAccount,
    deleteAccountFailed,
    deleteAccountSuccess,
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
    fetchArrayProfilesSuccess,
    fetchArrayProfilesFailed,
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
import { deleteAvatar, getStorageError, uploadFileFailed, uploadFileSuccess, uploadStringFile } from '../../features/firestorage/storageSlice';
import { syncInMatchesSuccess, syncOutMatchesSuccess } from "../../features/accounts/matches/matchesSlice";

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
    } catch (error) {
        yield put(fetchProfilesFailed(error.message));
    }
}

function* getCurrProfileSaga(action) {
    try {
        const authId = yield select(getAuthId);

        const { request } = action.payload;
        const profile = yield call(
            rsf.database[request.type],
            request.url + '/' + authId,
            request.params
        )
        if (!profile) {
            throw new Error("Profile not found at authId: " + authId);
        }
        yield put(fetchCurrProfilesSuccess({ ...profile, authId }));

        yield put(fetchArrayTag(profile.tags));
        yield take([fetchTagSuccess, fetchTagsFailed]);
        const tagError = yield select(getTagError);
        if (tagError !== "") {
            throw new Error(tagError);
        }
    } catch (error) {
        yield put(fetchCurrProfilesFailed(error.message));
    }
}

function* createProfileSaga(action) {
    let progress = 0;
    try {
        yield put(createAccount());
        yield take([createAccountSuccess, createAccountFailed]);

        const authError = yield select(getAccountError);
        if (authError !== "") {
            throw new Error(authError);
        }
        progress++;

        const { request } = action.payload;
        const authid = yield select(getAuthId);
        const newProfile = yield select(getInfos);

        yield put(uploadStringFile("profiles/" + authid, newProfile.imageURL));
        const { payload } = yield take([uploadFileSuccess, uploadFileFailed])

        const storageError = yield select(getStorageError);
        if (storageError !== "") {
            throw new Error(storageError);
        }
        progress++;

        const profile = { ...newProfile };

        profile.imageURL = payload.dlUrl;

        yield call(
            rsf.database[request.type],
            request.url + '/' + authid,
            { ...profile, ...request.params }
        );
        progress++;

        yield put(createProfileSuccess());
        yield put(clearNewAccount());
        yield put(fetchCurrProfile());
    } catch (error) {
        yield put(createProfileFailed(error.message));
        const authid = yield select(getAuthId);
        if (progress >= 1) {
            // Then the auth was created
            yield put(deleteAccount());
        }
        if (progress >= 2) {
            // Then the photo was uploaded
            yield put(deleteAvatar(authid));
        }
        throw error;
    }
}

function* updateProfileSaga(action) {
    try {
        const { request } = action.payload;
        const authId = yield select(getAuthId);
        const newProfile = yield select(getInfos);

        const profile = { ...newProfile };
        if (!newProfile.imageURL.match(/[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)?/gi)) {

            yield put(uploadStringFile("profiles/" + authId, newProfile.imageURL));
            const { payload } = yield take([uploadFileSuccess, uploadFileFailed])

            const storageError = yield select(getStorageError);
            if (storageError !== "") {
                throw new Error(storageError);
            }

            profile.imageURL = payload.dlUrl;
        }

        yield call(
            rsf.database[request.type],
            request.url + '/' + authId,
            { ...profile, ...request.params }
        );
        yield put(updateProfileSuccess());
        yield put(clearNewAccount());
        yield put(fetchCurrProfile());
    } catch (error) {
        yield put(updateProfileFailed(error.message));
        throw error;
    }
}

function* deleteProfileSaga(action) {
    try {
        const authId = yield select(getAuthId);

        // delete before login out
        yield put(deleteAvatar(authId));

        // It actually log you out
        yield put(deleteAccount());
        yield take([deleteAccountSuccess, deleteAccountFailed]);
        const accountError = yield select(getAccountError);
        if (accountError !== "") {
            throw new Error(accountError);
        }

        const { request } = action.payload;

        yield call(
            rsf.database[request.type],
            request.urls[0] + '/' + authId,
            request.params
        );

        //TODO: delete matches

        yield put(deleteProfileSuccess());
    } catch (error) {
        yield put(deleteProfileFailed(error.message));
        throw error;
    }
}

function* getArrayProfileChannel() {
    const chan = yield call(channel);
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const { payload } = yield take([
            fetchArrayProfile.type,
            syncOutMatchesSuccess,
            syncInMatchesSuccess,
        ]);
        yield fork(getArrayProfile, chan);
        yield put(chan, payload);
    }
}

function* getArrayProfile(chan) {
    const payload = yield take(chan)
    try {
        let request = {
            type: "read",
            url: "/profiles",
        };
        let authIds = Object.keys(payload);
        let fparams = {};
        if (payload.request) {
            request = payload.request;
            const { authIds: tmpIds, ...params } = payload.request.params;
            authIds = tmpIds;
            fparams = params;
        }

        let profiles = [];
        let tags = [];

        for (let i = 0; i < authIds.length; i++) {
            const authId = authIds[i];
            const profile = yield call(
                rsf.database[request.type],
                request.url + '/' + authId,
                fparams
            );
            profiles = [...profiles, { ...profile, authId }];
            profile.tags.forEach(tag => {
                if (!tags.includes(tag)) {
                    tags = [...tags, tag];
                }
            });
        }
        yield put(fetchArrayProfilesSuccess(profiles));

        yield put(fetchArrayTag(tags));
    }
    catch (error) {
        yield put(fetchArrayProfilesFailed(error.message));
    }
}

export default function* profilesSagas() {
    yield all([
        takeLatest(fetchProfile.type, getProfile),
        takeLatest(fetchCurrProfile.type, getCurrProfileSaga),
        takeLatest(createProfile.type, withCallback(createProfileSaga)),
        takeLatest(updateProfile.type, withCallback(updateProfileSaga)),
        takeLatest(deleteProfile.type, withCallback(deleteProfileSaga)),
        fork(getArrayProfileChannel),
    ]);
}