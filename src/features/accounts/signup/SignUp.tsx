import React from "react";
import { useDispatch } from "react-redux";

import { firebaseApp } from "../../../app/sagas"; //TODO: Not the right thing

import styles from './SignUp.module.css';
import styled from '@emotion/styled';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

type errorProps = {
  isError?: boolean;
}

const Label = styled.label`
  display: none;
`;

const Spacer = styled.div`
  margin: 10px;
`;

const TextBox = styled.div<errorProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 0;
  width: 200px;
  border: ${props => !props.isError ? '1px solid lightgray' : '2px solid red'};
  border-radius: 5px;
  background: var(--background2);

  & > * {
    border: none;
    margin: 0 5px 0 10px;
    outline: 0;
    height: 100%;
    background-color: transparent;
  }
  &:not(:last-child){
    ${props => !props.isError ? 'border-bottom: none' : ''};
  }
`;

const Submit = styled.button`
  margin-top: 10px;
  width: 220px;
  height: 32px;
  background-color: var(--accent2);
  border: none;
  border-radius: 5px;
  outline: 0;
  cursor: pointer;

  &:hover{
    /*TODO: Style on hover*/
  }
  &:focus{
    /*TODO: Style on click*/
  }
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
      <TextBox isError={hasError}>
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
      </TextBox>

      <Submit>Inscription</Submit>
    </form >
  );
};

export default SignUp;
