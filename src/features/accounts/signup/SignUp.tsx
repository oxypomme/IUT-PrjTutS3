import React from "react";
import { useDispatch } from "react-redux";

import { Button, Spacer, TextBox, HiddenLabel, ErrorLabel } from '../../../components/styledComponents';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { addMail, addPasswd } from "../accountSlice";
import { useHistory } from "react-router-dom";

import IError from "../../../include/IError";

const SignUp = (): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = React.useState<string>("");
    const [passwd, setPasswd] = React.useState<string>("");
    const [secondPasswd, setSecondPasswd] = React.useState<string>("");
    const [globalErrors, setGlobalErrors] = React.useState<Array<IError>>([]);

    const handleSetEmailOnChange = (event) => setEmail(event.target.value);

    const handleSetPasswordOnChange = (event) => setPasswd(event.target.value);

    const handleSetSecondPasswordOnChange = (event) => setSecondPasswd(event.target.value);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        let errors = [];

        if (!email || email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.([a-zA-Z0-9-]+){2,4}$/) === null)
            errors = [...errors, { component: "email", label: "L'email n'est pas valide." } as IError];
        if (!passwd || (passwd && passwd.length < 6))
            errors = [...errors, { component: "passwd", label: "Veuillez entrer un mot de passe de minimum 6 caractères." } as IError];
        if (!secondPasswd || passwd !== secondPasswd)
            errors = [...errors, { component: "secondPasswd", label: "Les mots de passes ne correspondent pas." } as IError];

        setGlobalErrors(errors);
        if (errors.length < 1) {
            dispatch(addMail(email));
            dispatch(addPasswd(passwd));
            history.push('SignUp/1');
        }
    };

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
                    type='email'
                    value={email}
                    onChange={handleSetEmailOnChange}
                    name='email'
                    placeholder='Addresse mail'
                />
                <HiddenLabel htmlFor="email">
                    Email
                </HiddenLabel>
            </TextBox>

            <Spacer />

            <TextBox borderColor={globalErrors.some(e => e.component === "passwd") ? 'red' : 'default'}>
                <FontAwesomeIcon icon={faLock} />
                <input
                    value={passwd}
                    onChange={handleSetPasswordOnChange}
                    type='password'
                    name='passwd'
                    placeholder='Mot de passe'
                />
                <HiddenLabel htmlFor='passwd'>
                    Password
                </HiddenLabel>
            </TextBox>
            <TextBox borderColor={globalErrors.some(e => e.component === "secondPasswd") ? 'red' : 'default'}>
                <FontAwesomeIcon icon={faLock} />
                <input
                    value={secondPasswd}
                    onChange={handleSetSecondPasswordOnChange}
                    type='password'
                    name='secondPasswd'
                    placeholder='Mot de passe'
                />
                <HiddenLabel htmlFor='secondPasswd'>
                    Password
                </HiddenLabel>
            </TextBox>

            <Button>Inscription</Button>
        </form >
    );
};

export default SignUp;
