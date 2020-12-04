import React, { ChangeEvent, ChangeEventHandler } from "react";
import classnames from "classnames";
import { useDispatch } from "react-redux";

import { User, addUser } from "../accountsSlice";

import styles from "./SignUp.module.css";

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
    setHasError(passwd !== newConfirmation);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const canSubmit = email && passwd && !hasError;
    if (canSubmit) {
      dispatch(addUser({ name: "", email, passwd }));
    } else {
      setGlobalError("fdsqhlkmnjuindjk fsmqmnkjdlsfqbklnjd fsqnkjbhdsflq");
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {!!globalError && <div>Error : {globalError}</div>}
      <div className={styles.textbox}>
        <FontAwesomeIcon icon={faUser} />
        <input
          type='email'
          value={email}
          onChange={handleSetEmailOnChange}
          name='email'
          placeholder='Addresse mail'
        />
        <label className={styles.label} htmlFor='email'>
          Email
        </label>
      </div>

      <div className={styles.spacer} />

      <div className={styles.textbox}>
        <FontAwesomeIcon icon={faLock} />
        <input
          value={passwd}
          onChange={handleSetPasswordOnChange}
          type='password'
          name='passwd'
          placeholder='Mot de passe'
        />
        <label className={styles.label} htmlFor='passwd'>
          Password
        </label>
      </div>
      <div
        className={classnames([styles.textbox], {
          [styles.errorfield]: hasError,
        })}
      >
        <FontAwesomeIcon icon={faLock} />
        <input
          value={confirmation}
          onChange={handleOnChange}
          type='password'
          name='passwdconf'
          placeholder='Mot de passe'
        />
        <label className={styles.label} htmlFor='passwdconf'>
          Password
        </label>
      </div>

      <button className={styles.submit}>Inscription</button>
    </form>
  );
};

export default SignUp;
