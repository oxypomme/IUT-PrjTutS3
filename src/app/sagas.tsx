import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';
import { firebaseConfig } from './firebaseconfig';

export const firebaseApp = firebase.initializeApp(firebaseConfig)

const reduxSagaFirebase = new ReduxSagaFirebase(firebaseApp);

function* mySaga() {
    // https://redux-saga.js.org/
    // https://www.npmjs.com/package/redux-saga-firebase
    yield "";
}

export default mySaga;