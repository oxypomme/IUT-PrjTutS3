import React from 'react';

import './SignUp.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

export function SignUp(): JSX.Element {
    return (
        <div className="App">
            <form className="signup-app">
                <div className="sign-textbox">
                    <FontAwesomeIcon icon={faUser} />
                    <input type="text" id="username" name="username" placeholder="Nom d'utilisateur" />
                    <label htmlFor="username">Username</label>
                </div>

                <div className="sign-spacer"></div>

                <div className="sign-textbox">
                    <FontAwesomeIcon icon={faUser} />
                    <input type="email" id="email" name="email" placeholder="Addresse mail" />
                    <label htmlFor="email">Email</label>
                </div>

                <div className="sign-spacer"></div>

                <div className="sign-textbox">
                    <FontAwesomeIcon icon={faLock} />
                    <input type="password" id="passwd" name="passwd" placeholder="Mot de passe" />
                    <label htmlFor="passwd">Password</label>
                </div>
                <div className="sign-textbox">
                    <FontAwesomeIcon icon={faLock} />
                    <input type="password" id="passwdconf" name="passwdconf" placeholder="Mot de passe" />
                    <label htmlFor="passwdconf">Password</label>
                </div>

                <input type="submit" value="Inscription" />
            </form>
        </div>
    );
}