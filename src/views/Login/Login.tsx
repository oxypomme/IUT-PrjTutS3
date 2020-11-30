import React from 'react';

import './Login.css';

import { SignIn } from '../../features/signin/SignIn';
import { SignUp } from '../../features/signup/SignUp';

export function Login(): JSX.Element {
    return (
        <div className="App login">
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