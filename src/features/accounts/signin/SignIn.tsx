import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import { firebaseApp } from "../../../app/sagas"; //TODO: Not the right thing

import {
    selectUsers
} from '../accountsSlice';

import { Button, TextBox, HiddenLabel } from '../../../components/styledComponents';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

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
            <Button primary>Connexion</Button>
        </form>
    );
}

export default SignIn;