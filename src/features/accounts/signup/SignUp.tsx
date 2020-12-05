import React from "react";
import { useDispatch } from "react-redux";
import firebase from "firebase";

import { Button, Spacer, TextBox, HiddenLabel } from '../../../components/styledComponents';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

const SignUp = (): JSX.Element => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState();
  const [passwd, setPasswd] = React.useState();
  const [hasError, setHasError] = React.useState(false);
  const [confirmation, setConfirmation] = React.useState();
  const [globalError, setGlobalError] = React.useState<string>();

  const handleSetEmailOnChange = (event) => setEmail(event.target.value);

  const handleSetPasswordOnChange = (event) => setPasswd(event.target.value);

  const handleOnChange = ({ target }) => {
    const { value: newConfirmation } = target;
    setConfirmation(newConfirmation);
    setHasError((passwd !== newConfirmation) && newConfirmation);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const canSubmit = email && passwd && !hasError;
    if (canSubmit) {
      await firebase.auth().createUserWithEmailAndPassword(email, passwd).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
      //TODO: Message d'inscription
      console.log("registered");
      //dispatch(addUser({ name: "", email, passwd }));
    } else {
      setGlobalError("fdsqhlkmnjuindjk fsmqmnkjdlsfqbklnjd fsqnkjbhdsflq");
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {!!globalError && <div>Error : {globalError}</div>}
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
      <TextBox borderColor={hasError ? 'red' : 'default'}>
        <FontAwesomeIcon icon={faLock} />
        <input
          value={confirmation}
          onChange={handleOnChange}
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
