import { call, put, takeLatest, take, select, all } from 'redux-saga/effects'
import { withCallback } from 'redux-saga-callback';

import { rsf } from '../firebase'
import '@firebase/database'

import {
    addPhoto,
    createAccount,
    createAccountFailed,
    createAccountSuccess,
    deleteAccount,
    deleteAccountFailed,
    deleteAccountSuccess,
    getAccountError,
    getAuthId,
    getInfos,
    logoutAccount,
    logoutAccountFailed,
    logoutAccountSuccess
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
import { getStorageError, getUploadedFiles, uploadFileFailed, uploadFileSuccess, uploadStringFile } from '../../features/firestorage/storageSlice';

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

function* getArrayProfile(action) {
    try {
        const { request } = action.payload;
        const { authIds, ...params } = request.params;

        let profiles = [];
        let tags = [];

        for (let i = 0; i < authIds.length; i++) {
            const authId = authIds[i];
            const profile = yield call(
                rsf.database[request.type],
                request.url + '/' + authId,
                params
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
    } catch (error) {
        yield put(fetchArrayProfilesFailed(error.message));
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
        if (!profile) {
            throw new Error("Profile not found at authId: " + authId);
        }
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

        yield put(uploadStringFile("profiles/" + authid, newProfile.imageURL));
        yield take([uploadFileSuccess, uploadFileFailed])

        const storageError = yield select(getStorageError);
        if (storageError != "") {
            throw new Error(storageError);
        }

        const profile = { ...newProfile };
        const files = yield select(getUploadedFiles);
        console.log(files);

        let mylink;
        if ((mylink = files.find(u => u.url === "profiles/" + authid)) !== undefined) {
            profile.imageURL = mylink.dlUrl;
        } else {
            throw new Error("File upload failed.");
        }

        yield call(
            rsf.database[request.type],
            request.url + '/' + authid,
            { ...profile, ...request.params }
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
        // It's actually log you out
        yield put(deleteAccount());
        yield take([deleteAccountSuccess, deleteAccountFailed]);
        const accountError = yield select(getAccountError);
        if (accountError !== "") {
            throw new Error(accountError);
        }

        const authId = yield select(getAuthId);
        const { request } = action.payload;
        for (let i = 0; i < request.urls.length; i++) {
            // By using this I avoid an error when deleting a profile without matches
            try {
                yield call(
                    rsf.database[request.type],
                    request.urls[i] + '/' + authId,
                    request.params
                );
            } catch (error) {
                break;
            }
        }

        yield put(deleteProfileSuccess());
    } catch (error) {
        yield put(deleteProfileFailed(error.message));
        throw error;
    }
}

export default function* profilesSagas() {
    yield all([
        takeLatest(fetchProfile.type, getProfile),
        takeLatest(fetchArrayProfile.type, getArrayProfile),
        takeLatest(fetchCurrProfile.type, getCurrProfile),
        takeLatest(createProfile.type, withCallback(createProfileSaga)),
        takeLatest(updateProfile.type, updateProfileSaga),
        takeLatest(deleteProfile.type, withCallback(deleteProfileSaga)),
    ]);
}