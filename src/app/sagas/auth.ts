import { call, put } from 'redux-saga/effects'

import { rsf } from '../firebase'

function* logInMail(action) {
    try {
        const data = yield call(rsf.auth.signInWithEmailAndPassword, action.payload.email, action.payload.passwd);
        yield put({ type: "LOGIN_EMAIL_SUCCEED", payload: data });
    } catch (error) {
        yield put({ type: "LOGIN_EMAIL_FAILED", payload: error.message });
    }
}

function* logOut() {
    try {
        const data = yield call(rsf.auth.signOut);
        yield put({ type: "LOGOUT_SUCCEED", payload: data });
    }
    catch (error) {
        yield put({ type: "LOGOUT_FAILED", payload: error.message });
    }
}

function* updateEmail(action) {
    try {
        yield call(rsf.auth.updateEmail, action.payload);
        yield put({ type: "UPDATE_EMAIL_SUCCEED", payload: {} });
    }
    catch (error) {
        yield put({ type: "UPDATE_EMAIL_FAILED", payload: error.message });
    }
}

function* updatePassword(action) {
    try {
        yield call(rsf.auth.updatePassword, action.payload);
        yield put({ type: "UPDATE_PASSWORD_SUCCEED", payload: {} });
    }
    catch (error) {
        yield put({ type: "UPDATE_PASSWORD_FAILED", payload: error.message });
    }
}

function* sendPasswordReset(action) {
    try {
        yield call(rsf.auth.sendPasswordResetEmail, action.payload, null)
        yield put({ type: "RESET_PASSWORD_SUCCEED", payload: {} });
    } catch (error) {
        yield put({ type: "RESET_PASSWORD_FAILED", payload: error.message });
    }
}

function* deleteAuth(action) {
    try {
        yield call(rsf.auth.deleteProfile)
        yield put({ type: "DELETE_AUTH_SUCCEED", payload: {} });
    } catch (error) {
        yield put({ type: "DELETE_AUTH_FAILED", payload: error.message });
    }
}

export default function* authSagas() {
    yield console.log("YEET");
}