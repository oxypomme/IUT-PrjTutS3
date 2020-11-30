import React from 'react';

import './Login.css';

import { SignIn } from '../../features/signin/SignIn';
import { SignUp } from '../../features/signup/SignUp';

export function Login(): JSX.Element {
    return (
        <div className="App login">
            <SignIn />
            <SignUp />
        </div>
    );
}