import React from 'react';

import styled from '@emotion/styled';
import { Button, TextBox, HiddenLabel, ErrorLabel } from '../../../components/styledComponents';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginAccount, resetPasswordAccount } from '../accountSlice';

import IError from '../../../include/IError';
import CheckBox from '../../../components/CheckBox';
import firebase from 'firebase';

const PasswdRecoveryLink = styled.a`
    color: hsl(0, 0%, 50%);
    font-size: 8pt;
    display: block;
    text-align: right;
    transition: color 0.25s;

    &:hover{
        color: hsl(0, 0%, 35%);
    }
`
const SignIn = (): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = React.useState<string>("");
    const [passwd, setPasswd] = React.useState<string>("");
    const [persistence, setPersistence] = React.useState<boolean>(false);
    const [globalErrors, setGlobalErrors] = React.useState<Array<IError>>([]);

    const handleSetEmailOnChange = (event) => setEmail(event.target.value);

    const handleSetPasswordOnChange = (event) => setPasswd(event.target.value);

    const handlePersistanceChange = (event) => setPersistence(event.target.checked);

    const onLogged = ({ error }) => {
        if (error) {
            alert("ERREUR : " + error.message);
        }
        else {
            alert('Vous êtes connecté.')
            history.goBack();
        }
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        let errors = [];
        if (!email)
            errors = [...errors, { component: "email", label: "L'email doit être remplie." } as IError];
        if (!passwd)
            errors = [...errors, { component: "passwd", label: "Le mot de passe doit être remplie." } as IError];

        setGlobalErrors(errors);
        if (errors.length < 1) {
            firebase.auth().setPersistence(persistence ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION)
                .then(() =>
                    dispatch({
                        type: loginAccount.type,
                        payload: {
                            request: {
                                type: "signInWithEmailAndPassword",
                                email,
                                passwd
                            }
                        },
                        onComplete: onLogged
                    })
                )
                .catch((error) => {
                    alert("ERREUR : " + error.message);
                });
        }
    }

    const handleResetPassword = async (event) => {
        event.preventDefault();
        let errors = [];
        if (!email)
            errors = [...errors, { component: "email", label: "L'email doit être remplie." } as IError];
        setGlobalErrors(errors);
        if (errors.length < 1) {
            dispatch(resetPasswordAccount(email));
        }
    }

    return (
        <form onSubmit={handleOnSubmit}>
            {globalErrors.length > 0 &&
                <ErrorLabel>
                    {globalErrors.map((error, index) => (
                        <div key={index}>
                            <FontAwesomeIcon icon={faExclamationTriangle} />
                            {error.label}
                        </div>
                    ))}
                </ErrorLabel>
            }
            <TextBox borderColor={globalErrors.some(e => e.component === "email") ? 'red' : 'default'}>
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
            <TextBox borderColor={globalErrors.some(e => e.component === "passwd") ? 'red' : 'default'}>
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
            <CheckBox
                content="Rester connecté"
                onChange={handlePersistanceChange}
            ></CheckBox>
            <Button primary>Connexion</Button>
        </form>
    );
}

export default SignIn;