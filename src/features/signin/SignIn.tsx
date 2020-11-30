import React from 'react';

import styles from './SignIn.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';


export function SignIn(): JSX.Element {
    return (
        <form>
            <div className={styles.textbox}>
                <FontAwesomeIcon icon={faUser} />
                <input type="text" id="username" name="username" placeholder="Nom d'utilisateur" />
                <label className={styles.label} htmlFor="username">Username</label>
            </div>
            <div className={styles.textbox}>
                <FontAwesomeIcon icon={faLock} />
                <input type="password" id="passwd" name="passwd" placeholder="Mot de passe" />
                <label className={styles.label} htmlFor="passwd">Password</label>
            </div>
            <input className={styles.submit} type="submit" value="Connexion" />
        </form>
    );
}