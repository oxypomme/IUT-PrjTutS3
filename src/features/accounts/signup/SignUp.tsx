import React from "react";
import { useDispatch } from "react-redux";

import { Button, Spacer, TextBox, HiddenLabel, ErrorLabel } from '../../../components/styledComponents';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { addMail } from "../accountSlice";

const SignUp = (): JSX.Element => {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState<string>();
    const [passwd, setPasswd] = React.useState();
    const [secondPasswd, setSecondPasswd] = React.useState();
    const [globalErrors, setGlobalErrors] = React.useState<Array<string>>([]);

    const handleSetEmailOnChange = (event) => setEmail(event.target.value);

    const handleSetPasswordOnChange = (event) => setPasswd(event.target.value);

    const handleSetSecondPasswordOnChange = (event) => setSecondPasswd(event.target.value);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        let errors = [];

        if (email === undefined || email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.([a-zA-Z0-9-]+){2,4}$/) === null)
            errors = [...errors, "L'email n'est pas valide."];
        if (passwd === undefined)
            errors = [...errors, "Veuillez entrer un mot de passe."];
        if (passwd !== secondPasswd)
            errors = [...errors, "Les mots de passes ne correspondent pas."];

        setGlobalErrors(errors);
        if (errors.length < 1) {
            dispatch(addMail(email));
            //DEBUG
            /*
            dispatch({
              type: 'CREATE-EMAIL_AUTH_REQUESTED',
              payload: {
                email: email,
                passwd: passwd
              }
            });*/
            //TODO: Redirection, prochain formulaire
        }
    };

    // TODO red border for the textboxs that contain an error
    return (
        <form onSubmit={handleOnSubmit}>
            {globalErrors.length > 0 &&
                <ErrorLabel>
                    {globalErrors.map((content, index) => (
                        <div key={index}>
                            <FontAwesomeIcon icon={faExclamationTriangle} />
                            {content}
                        </div>
                    ))}
                </ErrorLabel>
            }
            <TextBox>
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

            <TextBox>
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
            <TextBox>
                <FontAwesomeIcon icon={faLock} />
                <input
                    value={secondPasswd}
                    onChange={handleSetSecondPasswordOnChange}
                    type='password'
                    name='passwdconf'
                    placeholder='Mot de passe'
                />
                <HiddenLabel htmlFor='passwdconf'>
                    Password
                </HiddenLabel>
            </TextBox>

            <Button>Inscription</Button>
        </form >
    );
};

export default SignUp;
