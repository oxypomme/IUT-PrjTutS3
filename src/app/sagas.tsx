import { call, put, takeEvery, take, cancelled, cancel, fork } from 'redux-saga/effects'

import firebase from 'firebase/app';
import { firebaseConfig } from './firebaseconfig';

export const firebaseApp = firebase.initializeApp(firebaseConfig)

function* rootSaga() {
    // https://redux-saga.js.org/
    // https://www.npmjs.com/package/redux-saga-firebase

}

export default rootSaga;