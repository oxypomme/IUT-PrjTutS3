import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import {
    User,
    selectUsers
} from '../accountsSlice';

import styles from './SignIn.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

function onSubmit(users: User[]) {
    const username = document.getElementById("r-username") as HTMLInputElement | null;
    const passwd = document.getElementById("r-passwd") as HTMLInputElement | null;

    // Check if elements are found
    if (username && passwd)
        // Check if values are not null or empty
        if ((typeof username.value != 'undefined' && username.value)
            && (typeof passwd.value != 'undefined' && passwd.value)) {
            // TODO: CHANGE THAT PIECE OF ***** FOR GOD SAKE
            // Check if the username and the passwords match
            for (let index = 0; index < users.length; index++) {
                const user: User = users[index];
                if (user.name == username.value && user.passwd == passwd.value) {
                    // Reset form
                    username.value = "";
                    passwd.value = "";

                    // Action when logged
                    console.log("I'm in !");
                }
            }
        }
}

const SignIn = (): JSX.Element => {
    const users = useSelector(selectUsers, shallowEqual);

    return (
        <div>
            <div className={styles.textbox}>
                <FontAwesomeIcon icon={faUser} />
                <input
                    type="text"
                    name="l-username"
                    placeholder="Nom d'utilisateur"
                />
                <label className={styles.label} htmlFor="username">Username</label>
            </div>
            <div className={styles.textbox}>
                <FontAwesomeIcon icon={faLock} />
                <input
                    type="password"
                    name="l-passwd"
                    placeholder="Mot de passe"
                />
                <label className={styles.label} htmlFor="passwd">Password</label>
            </div>
            <button
                className={styles.submit}
                onClick={() => onSubmit(users)}
            >
                Connexion
            </button>
        </div>
    );
}

export default SignIn;