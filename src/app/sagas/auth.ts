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
import { getCurrProfile, getProfileError, resetCurrProfile } from '../../features/accounts/profileSlice';

export function* createEmailAuth(action) {
    try {
        const authInfo = yield select(getNewAuth);
        const { request } = action.payload;
        yield call(
            rsf.auth[request.type],
            authInfo.email,
            authInfo.passwd
        );
        yield put(createAccountSuccess());
    } catch (error) {
        yield put(createAccountFailed(error.message));
    }
}

function* logInMail(action) {
    try {
        const { request } = action.payload;
        const user = yield call(
            rsf.auth[request.type],
            request.email,
            request.passwd
        );
        yield put(loginAccountSuccess(user.uid));

        yield call(getCurrProfile, {
            payload: {
                request: {
                    type: "read",
                    url: "/profiles",
                    params: {}
                }
            }
        });

        const profileError = yield select(getProfileError);
        if (profileError != "") {
            throw new Error(profileError);
        }
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
            params
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