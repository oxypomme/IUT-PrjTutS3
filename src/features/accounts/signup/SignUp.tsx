import React from 'react';
import { useDispatch } from 'react-redux';

import {
    User,
    addUser,
} from '../accountsSlice';

import styles from './SignUp.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

function onSubmit(): User | null {
    const username = document.getElementById("r-username") as HTMLInputElement | null;
    const mail = document.getElementById("r-email") as HTMLInputElement | null;
    const passwd = document.getElementById("r-passwd") as HTMLInputElement | null;

    // Check if elements are found
    if (username && mail && passwd)
        // Check if values are not null or empty
        // TODO: password strength bar
        // TODO: check if email is really an email
        if ((typeof username.value != 'undefined' && username.value)
            && (typeof mail.value != 'undefined' && mail.value)
            && (typeof passwd.value != 'undefined' && passwd.value)) {
            // Reset form
            username.value = "";
            mail.value = "";
            passwd.value = "";

            return new User(username.value, mail.value, passwd.value);
        } else
            alert("Au moins un champ est nul.");
    else
        alert("Un des champs n'a pas été trouvé.");
    return null;
}

export function SignUp(): JSX.Element {
    const dispatch = useDispatch();

    return (
        <div>
            <div className={styles.textbox}>
                <FontAwesomeIcon icon={faUser} />
                <input
                    type="text"
                    id="r-username"
                    name="username"
                    placeholder="Nom d'utilisateur"
                />
                <label
                    className={styles.label}
                    htmlFor="username">
                    Username
                </label>
            </div>

            <div className={styles.spacer}></div>

            <div className={styles.textbox}>
                <FontAwesomeIcon icon={faUser} />
                <input
                    type="email"
                    id="r-email"
                    name="email"
                    placeholder="Addresse mail"
                />
                <label className={styles.label} htmlFor="email">Email</label>
            </div>

            <div className={styles.spacer}></div>

            <div className={styles.textbox}>
                <FontAwesomeIcon icon={faLock} />
                <input
                    type="password"
                    id="r-passwd"
                    name="passwd"
                    placeholder="Mot de passe"
                />
                <label className={styles.label} htmlFor="passwd">Password</label>
            </div>

            <button
                className={styles.submit}
                onClick={() => {
                    const user = onSubmit();
                    if (user) {
                        dispatch(addUser(JSON.stringify(user)));
                        // Action when registered
                        console.log("registred");
                    }
                }}
            >
                Inscription
            </button>
        </div>
    );
}