import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { withCallback } from 'redux-saga-callback';

import { rsf } from '../firebase'
import '@firebase/auth'

import {
    createAccount,
    createAccountSuccess,
    createAccountFailed,
    loginAccount,
    loginAccountSuccess,
    loginAccountFailed,
    logoutAccount,
    logoutAccountSuccess,
    logoutAccountFailed,
    updateEmailAccount,
    updateAccountSuccess,
    updateAccountFailed,
    updatePasswordAccount,
    resetPasswordAccount,
    resetPasswordAccountSuccess,
    resetPasswordAccountFailed,
    deleteAccount,
    deleteAccountSuccess,
    deleteAccountFailed,
    getNewAuth
} from '../../features/accounts/accountSlice';

import {
    resetCurrProfile,
    resetProfiles
} from '../../features/accounts/profileSlice';

function* createEmailAuth(action) {
    try {
        const authInfo = yield select(getNewAuth);
        const { request } = action.payload;
        const data = yield call(
            rsf.auth[request.type],
            authInfo.email,
            authInfo.passwd
        );
        const { user } = data;
        yield put(createAccountSuccess(user.uid));
    } catch (error) {
        yield put(createAccountFailed(error.message));
    }
}

function* logInMail(action) {
    try {
        const { request } = action.payload;
        yield call(
            rsf.auth[request.type],
            request.email,
            request.passwd
        );
        yield put(loginAccountSuccess());
    } catch (error) {
        yield put(loginAccountFailed(error.message));
        throw error;
    }
}

function* logOut(action) {
    try {
        const { request } = action.payload;
        yield call(
            rsf.auth[request.type]
        );
        yield put(logoutAccountSuccess());
        yield put(resetCurrProfile());
        yield put(resetProfiles());
    } catch (error) {
        yield put(logoutAccountFailed(error.message));
        throw error;
    }
}

function* updateAuth(action) {
    try {
        const { request } = action.payload;
        yield call(
            rsf.auth[request.type],
            request.param
        );
        yield put(updateAccountSuccess());
    } catch (error) {
        yield put(updateAccountFailed(error.message));
    }
}

function* sendPasswordReset(action) {
    try {
        const { request } = action.payload;
        yield call(
            rsf.auth[request.type],
            request.email
        );
        yield put(resetPasswordAccountSuccess());
    } catch (error) {
        yield put(resetPasswordAccountFailed(error.message));
    }
}

export function* deleteAuth(action) {
    try {
        const { request } = action.payload;
        yield call(
            rsf.auth[request.type],
            request.params
        );
        yield put(deleteAccountSuccess());
    } catch (error) {
        yield put(deleteAccountFailed(error.message));
    }
}

export default function* authSagas() {
    yield all([
        takeLatest(createAccount.type, createEmailAuth),
        takeLatest(loginAccount.type, withCallback(logInMail)),
        takeLatest(logoutAccount.type, withCallback(logOut)),
        takeLatest([updateEmailAccount.type, updatePasswordAccount.type], updateAuth),
        takeLatest(resetPasswordAccount.type, sendPasswordReset),
        takeLatest(deleteAccount.type, deleteAuth),
    ]);
}