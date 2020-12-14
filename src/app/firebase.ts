import { firebaseConfig } from './firebaseconfig';
import firebase from 'firebase/app';
import ReduxSagaFirebase from 'redux-saga-firebase';

const firebaseApp = firebase.initializeApp(firebaseConfig)
export const rsf = new ReduxSagaFirebase(firebaseApp);

export default firebaseApp;