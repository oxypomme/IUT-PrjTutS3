import React from 'react';

import styles from './SignUp.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

export function SignUp(): JSX.Element {
    return (
        <form>
            <div className={styles.textbox}>
                <FontAwesomeIcon icon={faUser} />
                <input type="text" id="username" name="username" placeholder="Nom d'utilisateur" />
                <label className={styles.label} htmlFor="username">Username</label>
            </div>

            <div className={styles.spacer}></div>

            <div className={styles.textbox}>
                <FontAwesomeIcon icon={faUser} />
                <input type="email" id="email" name="email" placeholder="Addresse mail" />
                <label className={styles.label} htmlFor="email">Email</label>
            </div>

            <div className={styles.spacer}></div>

            <div className={styles.textbox}>
                <FontAwesomeIcon icon={faLock} />
                <input type="password" id="passwd" name="passwd" placeholder="Mot de passe" />
                <label className={styles.label} htmlFor="passwd">Password</label>
            </div>
            <div className={styles.textbox}>
                <FontAwesomeIcon icon={faLock} />
                <input type="password" id="passwdconf" name="passwdconf" placeholder="Mot de passe" />
                <label className={styles.label} htmlFor="passwdconf">Password</label>
            </div>

            <input className={styles.submit} type="submit" value="Inscription" />
        </form>
    );
}