import { call, put, takeLatest, take, select } from 'redux-saga/effects'
import { useSelector } from 'react-redux';

import { rsf } from '../firebase'
import '@firebase/database'

import { deleteAccount, getAccountError, getAuthId } from '../../features/accounts/accountSlice';
import { deleteAuth } from './auth';
import {
    createProfile,
    createProfileFailed,
    createProfileSuccess,
    deleteProfile,
    deleteProfileFailed,
    fetchProfiles,
    fetchProfilesFailed,
    fetchProfilesSuccess,
    getAllProfiles,
    getProfileError,
    updateProfile,
    updateProfileFailed,
    updateProfileSuccess
} from '../../features/accounts/profileSlice';

function* getProfiles(action?) {
    try {
        const { request } = action.request;
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

function* createProfileSaga(action) {
    try {
        yield call(fetchProfiles);
        const profileError = useSelector(getProfileError);
        if (profileError !== "")
            throw new Error(profileError);
        const profiles = useSelector(getAllProfiles);

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
        const accountError = useSelector(getAccountError);
        if (accountError !== "") {
            throw new Error(accountError);
        }

        const { request } = action.payload;
        yield call(
            rsf.database[request.type],
            request.urlP + '/' + request.params
        );
        yield call(
            rsf.database[request.type],
            request.urlL + '/' + request.params
        );
        yield put(createProfileSuccess());
    } catch (error) {
        yield put(deleteProfileFailed(error.message));
    }
}

export default function* profilesSagas() {
    yield takeLatest(fetchProfiles.type, getProfiles);
    yield takeLatest(createProfile.type, createProfileSaga);
    yield takeLatest(updateProfile.type, updateProfileSaga);
    yield takeLatest(deleteProfile.type, deleteProfileSaga);
}