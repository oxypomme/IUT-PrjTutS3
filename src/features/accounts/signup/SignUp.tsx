import React, { Dispatch, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
    User,
    addUser,
} from '../accountsSlice';

import styles from './SignUp.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

function onSubmit(dispatch: Dispatch<unknown>): void {
    const username = document.getElementById("r-username") as HTMLInputElement | null;
    const mail = document.getElementById("r-email") as HTMLInputElement | null;
    const passwd = document.getElementById("r-passwd") as HTMLInputElement | null;
    const passwdconf = document.getElementById("r-passwdconf") as HTMLInputElement | null;

    // Check if elements are found
    if (username && mail && passwd && passwdconf)
        // Check if values are not null or empty
        if ((typeof username.value != 'undefined' && username.value)
            && (typeof mail.value != 'undefined' && mail.value)
            && (typeof passwd.value != 'undefined' && passwd.value)
            && (typeof passwdconf.value != 'undefined' && passwdconf.value))
            // TODO: password strength bar
            // TODO: check if email is really an email
            // Check if the password confirmation is true
            if (passwd?.value === passwdconf?.value) {
                // Create the user
                dispatch(addUser(JSON.stringify(new User(username.value, mail.value, passwd.value))))

                // Reset form
                username.value = "";
                mail.value = "";
                passwd.value = "";
                passwdconf.value = "";

                // Action when registered
                console.log("registred");
            } else
                alert("Les mots de passes ne correspondent pas.");
        else
            alert("Au moins un champ est nul.");
    else
        alert("Un des champs n'a pas été trouvé.");
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
            <div className={styles.textbox}>
                <FontAwesomeIcon icon={faLock} />
                <input
                    type="password"
                    id="r-passwdconf"
                    name="passwdconf"
                    placeholder="Mot de passe"
                    onChange={event => {
                        const passwd = document.getElementById("r-passwd") as HTMLInputElement;
                        if (passwd && passwd.value != event.target.value)
                            event.target.parentElement?.classList.add(styles.errorfield);
                        else
                            event.target.parentElement?.classList.remove(styles.errorfield);
                    }}
                />
                <label className={styles.label} htmlFor="passwdconf">Password</label>
            </div>

            <button
                className={styles.submit}
                onClick={() => onSubmit(dispatch)}
            >
                Inscription
            </button>
        </div>
    );
}