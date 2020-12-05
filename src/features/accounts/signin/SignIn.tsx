import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import { firebaseApp } from "../../../app/sagas"; //TODO: Not the right thing

import {
    selectUsers
} from '../accountsSlice';

import styles from './SignIn.module.css';
import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const Label = styled.label`
    display: none;
`;

const SignIn = (): JSX.Element => {
    const users = useSelector(selectUsers, shallowEqual);

    const [email, setEmail] = React.useState();
    const [passwd, setPasswd] = React.useState();

    const handleSetEmailOnChange = (event) => setEmail(event.target.value);

    const handleSetPasswordOnChange = (event) => setPasswd(event.target.value);

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const canSubmit = email && passwd;
        if (canSubmit) {
            await firebaseApp.auth().signInWithEmailAndPassword(email, passwd).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
            });
            // TODO: message de connexion
            console.log("connected");
        }
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <div className={styles.textbox}>
                <FontAwesomeIcon icon={faUser} />
                <input
                    type="text"
                    name="email"
                    placeholder="Adresse mail"
                    value={email}
                    onChange={handleSetEmailOnChange}
                />
                <Label htmlFor="email">Email</Label>
            </div>
            <div className={styles.textbox}>
                <FontAwesomeIcon icon={faLock} />
                <input
                    type="password"
                    name="passwd"
                    placeholder="Mot de passe"
                    value={passwd}
                    onChange={handleSetPasswordOnChange}
                />
                <Label htmlFor="passwd">Password</Label>
            </div>
            <button className={styles.submit}>Connexion</button>
        </form>
    );
}

export default SignIn;