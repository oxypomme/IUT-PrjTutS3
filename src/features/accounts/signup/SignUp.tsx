import React, { Dispatch, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    User,
    addUser,
    selectUsers
} from '../accountsSlice';

import styles from './SignUp.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

function onSubmit(dispatch: Dispatch<unknown>, username: string, mail: string, passwd: string): void {
    //TODO: Vérification des données
    dispatch(addUser(JSON.stringify(new User(username, mail, passwd))))
}

export function SignUp(): JSX.Element {
    const dispatch = useDispatch();
    //const users = useSelector(selectUsers);

    const [username, setUsername] = useState('');
    const [mail, setMail] = useState('');
    const [passwd, setPasswd] = useState('');

    return (
        <form>
            <div className={styles.textbox}>
                <FontAwesomeIcon icon={faUser} />
                <input
                    type="text"
                    name="username"
                    placeholder="Nom d'utilisateur"
                    onChange={event => setUsername(event.target.value)}
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
                    name="email"
                    placeholder="Addresse mail"
                    onChange={event => setMail(event.target.value)}
                />
                <label className={styles.label} htmlFor="email">Email</label>
            </div>

            <div className={styles.spacer}></div>

            <div className={styles.textbox}>
                <FontAwesomeIcon icon={faLock} />
                <input
                    type="password"
                    name="passwd"
                    placeholder="Mot de passe"
                    onChange={event => setPasswd(event.target.value)}
                />
                <label className={styles.label} htmlFor="passwd">Password</label>
            </div>
            <div className={styles.textbox}>
                <FontAwesomeIcon icon={faLock} />
                <input
                    type="password"
                    name="passwdconf"
                    placeholder="Mot de passe"
                    onChange={event => { console.log("todo"); /*TODO: check if same as passwd*/ }}
                />
                <label className={styles.label} htmlFor="passwdconf">Password</label>
            </div>

            <button
                className={styles.submit}
                onClick={() => onSubmit(dispatch, username, mail, passwd)}
            >
                Inscription
            </button>
        </form>
    );
}