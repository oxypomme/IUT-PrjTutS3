import React from "react";
import { useDispatch } from "react-redux";

import { firebaseApp } from "../../../app/sagas"; //TODO: Not the right thing

import styled from '@emotion/styled/macro';
import { Button, Spacer, TextBox } from '../../../components/styledComponents';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

type errorProps = {
  isError?: boolean;
}

const Label = styled.label`
  display: none;
`;

const CustomTextBox = styled(TextBox) <errorProps>`
  border: ${props => !props.isError ? '1px solid lightgray' : '1px solid red'};
`;

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
      await firebaseApp.auth().createUserWithEmailAndPassword(email, passwd).catch((error) => {
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
        <Label htmlFor="email">
          Email
        </Label>
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
        <Label htmlFor='passwd'>
          Password
        </Label>
      </TextBox>
      <CustomTextBox isError={hasError}>
        <FontAwesomeIcon icon={faLock} />
        <input
          value={confirmation}
          onChange={handleOnChange}
          type='password'
          name='passwdconf'
          placeholder='Mot de passe'
        />
        <Label htmlFor='passwdconf'>
          Password
        </Label>
      </CustomTextBox>

      <Button>Inscription</Button>
    </form >
  );
};

export default SignUp;
