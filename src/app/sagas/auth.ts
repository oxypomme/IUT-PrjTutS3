import { call, put } from 'redux-saga/effects'

import { rsf } from '../firebase'

function* logInMail(action) {
    try {
        const data = yield call(rsf.auth.signInWithEmailAndPassword, action.payload.email, action.payload.passwd);
        yield put({ type: "LOGIN_EMAIL_SUCCEED", data: data });
    } catch (error) {
        yield put({ type: "LOGIN_EMAIL_FAILED", message: error.message });
    }
}

export default function* authSagas() {
    yield console.log("YEET");
}