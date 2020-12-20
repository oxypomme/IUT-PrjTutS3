import React from "react";
import { Redirect } from 'react-router-dom'
import { useSelector } from "react-redux";
import { getIsConnected } from "../../features/accounts/accountSlice";

import "./Login.css";

import SignIn from '../../features/accounts/signin/SignIn';
import SignUp from '../../features/accounts/signup/SignUp';

export function Login(): JSX.Element {
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
