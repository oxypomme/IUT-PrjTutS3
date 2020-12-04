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
    const mail = document.getElementById("r-email") as HTMLInputElement | null;
    const passwd = document.getElementById("r-passwd") as HTMLInputElement | null;
    const passwdconf = document.getElementById("r-passwdconf") as HTMLInputElement | null;

    // Check if elements are found
    if (mail && passwd && passwdconf)
        // Check if values are not null or empty
        if ((typeof mail.value != 'undefined' && mail.value)
            && (typeof passwd.value != 'undefined' && passwd.value)
            && (typeof passwdconf.value != 'undefined' && passwdconf.value))
            // TODO: password strength bar
            // TODO: check if email is really an email
            // Check if the password confirmation is true
            if (passwd?.value === passwdconf?.value) {
                // Reset form
                mail.value = "";
                passwd.value = "";
                passwdconf.value = "";

                return new User("username", mail.value, passwd.value);
            } else
                alert("Les mots de passes ne correspondent pas.");
        else
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