import React from 'react';

import styled from '@emotion/styled';
import { Button, TextBox, HiddenLabel } from '../../../components/styledComponents';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setConnected } from '../accountSlice';

const PasswdRecoveryLink = styled.a`
    color: gray;
    font-size: 8pt;
    display: block;
    text-align: right;
`

const SignIn = (): JSX.Element => {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState();
    const [passwd, setPasswd] = React.useState();

    const handleSetEmailOnChange = (event) => setEmail(event.target.value);

    const handleSetPasswordOnChange = (event) => setPasswd(event.target.value);

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const canSubmit = email && passwd;
        if (canSubmit) {
            dispatch({
                type: 'LOGIN-EMAIL_AUTH_REQUESTED',
                payload: {
                    email: email,
                    passwd: passwd
                }
            });
            // TODO: ERRORS
            // TODO: real authid
            dispatch(setConnected("authid"));
            // TODO: message de connexion
        }
    }

    const handleResetPassword = async (event) => {
        event.preventDefault();
        if (email) {
            dispatch({
                type: 'RESET-PASSWORD_AUTH_REQUESTED',
                payload: email
            });
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