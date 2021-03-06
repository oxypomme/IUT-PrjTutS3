import { all } from 'redux-saga/effects'

import tagsSagas from './tags'
import profilesSagas from './profiles'
import authSagas from './auth';
import storageSagas from './storage'
import matchesSagas from './matches';
import chatSagas from './messaging';

export default function* rootSaga() {
    // https://redux-saga.js.org/
    // https://redux-saga-firebase.js.org/
    yield all([
        tagsSagas(),
        profilesSagas(),
        authSagas(),
        storageSagas(),
        matchesSagas(),
        chatSagas(),
    ]);
}