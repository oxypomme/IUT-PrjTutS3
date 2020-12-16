import { call, put, select, takeLatest } from 'redux-saga/effects'
import { getAuthId } from '../../features/accounts/accountSlice';

import { rsf } from '../firebase'

function* createEmailAuth(action) {
    try {
        const data = yield call(rsf.auth.createUserWithEmailAndPassword, action.payload.email, action.payload.passwd);
        yield put({ type: "CREATE-EMAIL_AUTH_SUCCEED", payload: data });
    } catch (error) {
        yield put({ type: "CREATE-EMAIL_AUTH_FAILED", payload: error.message });
    }
}

function* logInMail(action) {
    try {
        const data = yield call(rsf.auth.signInWithEmailAndPassword, action.payload.email, action.payload.passwd);
        yield put({ type: "LOGIN-EMAIL_AUTH_SUCCEED", payload: data });
    } catch (error) {
        yield put({ type: "LOGIN-EMAIL_AUTH_FAILED", payload: error.message });
    }
}

function* logOut() {
    try {
        const data = yield call(rsf.auth.signOut);
        yield put({ type: "LOGOUT_AUTH_SUCCEED", payload: data });
    }
    catch (error) {
        yield put({ type: "LOGOUT_AUTH_FAILED", payload: error.message });
    }
}

function* updateEmail(action) {
    try {
        yield call(rsf.auth.updateEmail, action.payload);
        yield put({ type: "UPDATE-EMAIL_AUTHSUCCEED", payload: {} });
    }
    catch (error) {
        yield put({ type: "UPDATE-EMAIL_AUTH_FAILED", payload: error.message });
    }
}

function* updatePassword(action) {
    try {
        yield call(rsf.auth.updatePassword, action.payload);
        yield put({ type: "UPDATE-PASSWORD_AUTH_SUCCEED", payload: {} });
    }
    catch (error) {
        yield put({ type: "UPDATE-PASSWORD_AUTH_FAILED", payload: error.message });
    }
}

function* sendPasswordReset(action) {
    try {
        yield call(rsf.auth.sendPasswordResetEmail, action.payload, null)
        yield put({ type: "RESET-PASSWORD_AUTH_SUCCEED", payload: {} });
    } catch (error) {
        yield put({ type: "RESET-PASSWORD_AUTH_FAILED", payload: error.message });
    }
}

export function* deleteAuth() {
    try {
        yield call(rsf.auth.deleteProfile)
        yield put({ type: "DELETE_AUTH_SUCCEED", payload: {} });
    } catch (error) {
        yield put({ type: "DELETE_AUTH_FAILED", payload: error.message });
    }
}

export default function* authSagas() {
    yield takeLatest('CREATE-EMAIL_AUTH_REQUESTED', createEmailAuth);
    yield takeLatest('LOGIN-EMAIL_AUTH_REQUESTED', logInMail);
    yield takeLatest('LOGOUT_AUTH_REQUESTED', logOut);
    yield takeLatest('UPDATE-EMAIL_AUTH_REQUESTED', updateEmail);
    yield takeLatest('UPDATE-PASSWORD_AUTH_REQUESTED', updatePassword);
    yield takeLatest('RESET-PASSWORD_AUTH_REQUESTED', sendPasswordReset);
    yield takeLatest('DELETE_AUTH_REQUESTED', deleteAuth);
}