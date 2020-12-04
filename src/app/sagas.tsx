import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';
import { firebaseConfig } from './firebaseconfig';

const reduxSagaFirebase = new ReduxSagaFirebase(firebase.initializeApp(firebaseConfig));

function* mySaga() {
    // https://redux-saga.js.org/
    // https://www.npmjs.com/package/redux-saga-firebase
    yield "";
}

export default mySaga;