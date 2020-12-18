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
    updatePasswordAccount,
    resetPasswordAccount,
    deleteAccount
} from '../../features/accounts/accountSlice';

function* createEmailAuth(action) {
    try {
        const request = action.payload;
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
        const request = action.payload;
        //BUG: request.type is signInWithEmailAndPassword and undefined at the same time
        console.log(request.type);
        yield call(
            rsf.auth[request.type],
            request.email,
            request.passwd
        );
        yield put(loginAccountSuccess());
    } catch (error) {
        yield put(loginAccountFailed(error.message));
    }
}

function* logOut(action) {
    try {
        const request = action.payload;
        yield call(
            rsf.auth[request.type]
        );
        yield put(logoutAccountSuccess());
    } catch (error) {
        yield put(logoutAccountFailed(error.message));
    }
}

function* updateEmail(action) {
    try {
        const request = action.payload;
        yield call(
            rsf.auth[request.type],
            request.email
        );
        yield put(logoutAccountSuccess());
    } catch (error) {
        yield put(logoutAccountFailed(error.message));
    }
}

function* updatePassword(action) {
    try {
        const request = action.payload;
        yield call(
            rsf.auth[request.type],
            request.passwd
        );
        yield put(logoutAccountSuccess());
    } catch (error) {
        yield put(logoutAccountFailed(error.message));
    }
}

function* sendPasswordReset(action) {
    try {
        const request = action.payload;
        yield call(
            rsf.auth[request.type],
            request.email
        );
        yield put(logoutAccountSuccess());
    } catch (error) {
        yield put(logoutAccountFailed(error.message));
    }
}

export function* deleteAuth(action) {
    try {
        const request = action.payload;
        yield call(
            rsf.auth[request.type]
        );
        yield put(logoutAccountSuccess());
    } catch (error) {
        yield put(logoutAccountFailed(error.message));
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