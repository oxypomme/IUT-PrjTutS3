import React from 'react';

import './SignIn.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';


export function SignIn(): JSX.Element {
    return (
        <form className="sign-app">
            <div className="sign-textbox">
                <FontAwesomeIcon icon={faUser} />
                <input type="text" id="username" name="username" placeholder="Nom d'utilisateur" />
                <label htmlFor="username">Username</label>
            </div>
            <div className="sign-textbox">
                <FontAwesomeIcon icon={faLock} />
                <input type="password" id="passwd" name="passwd" placeholder="Mot de passe" />
                <label htmlFor="passwd">Password</label>
            </div>
            <input type="submit" value="Connexion" />
        </form>
    );
}