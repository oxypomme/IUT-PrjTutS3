import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import firebase from "firebase/app";
import 'firebase/auth';

import {
    selectUsers
} from '../accountsSlice';

import styled from '@emotion/styled';
import { Button, TextBox, HiddenLabel } from '../../../components/styledComponents';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const PasswdRecoveryLink = styled.a`
    color: gray;
    font-size: 8pt;
    display: block;
    text-align: right;
`

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
            await firebase.auth().signInWithEmailAndPassword(email, passwd).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                return;
            });
            // TODO: message de connexion
            alert("connected");
            window.location.reload();
        }
    }

    const handleResetPassword = async (event) => {
        event.preventDefault();
        if (email) {
            await firebase.auth().sendPasswordResetEmail(email).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
            });
            // TODO: Timer
            console.log("password recovery");
        }
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <TextBox>
                <FontAwesomeIcon icon={faUser} />
                <input
                    type="text"
                    name="email"
                    placeholder="Adresse mail"
                    value={email}
                    onChange={handleSetEmailOnChange}
                />
                <HiddenLabel htmlFor="email">Email</HiddenLabel>
            </TextBox>
            <TextBox>
                <FontAwesomeIcon icon={faLock} />
                <input
                    type="password"
                    name="passwd"
                    placeholder="Mot de passe"
                    value={passwd}
                    onChange={handleSetPasswordOnChange}
                />
                <HiddenLabel htmlFor="passwd">Password</HiddenLabel>
            </TextBox>
            <PasswdRecoveryLink href="#" onClick={handleResetPassword}>Mot de passe oublié ?</PasswdRecoveryLink>
            <Button primary>Connexion</Button>
        </form>
    );
}

export default SignIn;