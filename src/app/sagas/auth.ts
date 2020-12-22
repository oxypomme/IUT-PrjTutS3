import { call, put, select, takeLatest } from 'redux-saga/effects'

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
    updateEmailAccountSuccess,
    updateEmailAccountFailed,
    updatePasswordAccount,
    updatePasswordAccountSuccess,
    updatePasswordAccountFailed,
    resetPasswordAccount,
    resetPasswordAccountSuccess,
    resetPasswordAccountFailed,
    deleteAccount,
    deleteAccountSuccess,
    deleteAccountFailed
} from '../../features/accounts/accountSlice';

function* createEmailAuth(action) {
    try {
        const { request } = action.payload;
        yield call(
            rsf.auth[request.type],
            request.email,
            request.passwd
        );
        yield put(createAccountSuccess());
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
        // J'ai vomi
        action.payload.history.goBack();
    } catch (error) {
        yield put(loginAccountFailed(error.message));
    }
}

function* logOut(action) {
    try {
        const { request } = action.payload;
        yield call(
            rsf.auth[request.type]
        );
        yield put(logoutAccountSuccess());
        // J'ai vomi
        action.payload.history.push('/');
    } catch (error) {
        yield put(logoutAccountFailed(error.message));
    }
}

function* updateEmail(action) {
    try {
        const { request } = action.payload;
        yield call(
            rsf.auth[request.type],
            request.email
        );
        yield put(updateEmailAccountSuccess());
    } catch (error) {
        yield put(updateEmailAccountFailed(error.message));
    }
}

function* updatePassword(action) {
    try {
        const { request } = action.payload;
        yield call(
            rsf.auth[request.type],
            request.passwd
        );
        yield put(updatePasswordAccountSuccess());
    } catch (error) {
        yield put(updatePasswordAccountFailed(error.message));
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
            rsf.auth[request.type]
        );
        yield put(deleteAccountSuccess());
    } catch (error) {
        yield put(deleteAccountFailed(error.message));
    }
}

export default function* authSagas() {
    yield takeLatest(createAccount.type, createEmailAuth);
    yield takeLatest(loginAccount.type, logInMail);
    yield takeLatest(logoutAccount.type, logOut);
    yield takeLatest(updateEmailAccount.type, updateEmail);
    yield takeLatest(updatePasswordAccount.type, updatePassword);
    yield takeLatest(resetPasswordAccount.type, sendPasswordReset);
    yield takeLatest(deleteAccount.type, deleteAuth);
}