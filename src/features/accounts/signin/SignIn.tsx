import React, { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import {
    User,
    selectUsers
} from '../accountsSlice';

import styles from './SignIn.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

function onSubmit(users: User[], username: string, passwd: string) {
    for (let index = 0; index < users.length; index++) {
        const user: User = users[index];
        if (user.name == username && user.passwd == passwd) {
            console.log("I'm in !");
            //TODO: action on logged
        }
    }
}

export function SignIn(): JSX.Element {
    const users = useSelector(selectUsers, shallowEqual);

    const [username, setUsername] = useState('');
    const [passwd, setPasswd] = useState('');

    return (
        <div>
            <div className={styles.textbox}>
                <FontAwesomeIcon icon={faUser} />
                <input
                    type="text"
                    name="username"
                    placeholder="Nom d'utilisateur"
                    onChange={event => setUsername(event.target.value)}
                />
                <label className={styles.label} htmlFor="username">Username</label>
            </div>
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
            <button
                className={styles.submit}
                onClick={() => onSubmit(users, username, passwd)}
            >
                Connexion
            </button>
        </div>
    );
}