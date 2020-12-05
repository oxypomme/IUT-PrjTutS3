import React, { useState } from "react";
import { Redirect } from 'react-router-dom'
import firebase from "firebase/app";
import 'firebase/auth';

import "./Login.css";

import SignIn from '../../features/accounts/signin/SignIn';
import SignUp from '../../features/accounts/signup/SignUp';

export function Login(): JSX.Element {
  const guser = firebase.auth().currentUser;

  const [, setRerender] = useState(0);
  firebase.auth().onAuthStateChanged(function (user) {
    if (user && !guser) {
      setRerender(value => ++value);
    }
  });

  if (guser) {
    return <Redirect to='/' />;
  }
  else {
    return (
      <div className='App login'>
        <div>
          <h2>Connexion</h2>
          <SignIn />
        </div>
        <div>
          <h2>Inscription</h2>
          <SignUp />
        </div>
      </div>
    );
  }
}
