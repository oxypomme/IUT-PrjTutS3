import React from 'react';

import styled from '@emotion/styled';
import { Button, TextBox, HiddenLabel, ErrorLabel } from '../../../components/styledComponents';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAccountError, loginAccount, resetPasswordAccount } from '../accountSlice';

import IError from '../../../include/IError';

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
    const loginError = useSelector(getAccountError);
    const [email, setEmail] = React.useState();
    const [passwd, setPasswd] = React.useState();
    const [globalErrors, setGlobalErrors] = React.useState<Array<IError>>([]);

    const handleSetEmailOnChange = (event) => setEmail(event.target.value);

    const handleSetPasswordOnChange = (event) => setPasswd(event.target.value);

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        let errors = [];
        if (!email)
            errors = [...errors, { component: "email", label: "L'email doit être remplie." } as IError];
        if (!passwd)
            errors = [...errors, { component: "passwd", label: "Le mot de passe doit être remplie." } as IError];

        setGlobalErrors(errors);
        if (errors.length < 1) {
            dispatch(loginAccount({ email, passwd }));
            //TODO: If success, history.goBack(); + message
            /*
            if (loginError !== "") {
                alert("Erreur de connexion : \n" + loginError);
            }
            else {
                alert("Vous êtes connecté")
                //history.push('/');
            }
            */
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
            <Button primary>Connexion</Button>
        </form>
    );
}

export default SignIn;