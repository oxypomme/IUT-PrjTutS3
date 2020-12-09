import React from "react";

import { Button, TextBox, HiddenLabel } from '../../../components/styledComponents';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { isNonNullChain } from "typescript";

const RegisterPersonal = (): JSX.Element => {
  const [name, setName] = React.useState();
  const [hasError, setHasError] = React.useState(false);
  const [age, setAge] = React.useState();
  const [town, setTown] = React.useState();


  const handleOnChange = ({ target }) => {
    const { value: newName } = target;
    setName(newName);
    setHasError(name !== isNonNullChain);
  };
  const handleSetAgeOnChange = (event) => setAge(event.target.value);

  const handleSetTownOnChange = (event) => setTown(event.target.value);

  return (
    <form>
      <TextBox borderColor={hasError ? 'red' : 'default'}>
        <FontAwesomeIcon icon={faUser} />
        <input
          type='name'
          value={name}
          onChange={handleOnChange}
          name='name'
          placeholder='Nom'
        />
        <HiddenLabel htmlFor="name">
          Name
        </HiddenLabel>
      </TextBox>

      <TextBox>
        <FontAwesomeIcon icon={faLock} />
        <input
          value={age}
          onChange={handleSetAgeOnChange}
          type='age'
          name='age'
          placeholder='Age'
        />
        <HiddenLabel htmlFor='age'>
          Age
        </HiddenLabel>
      </TextBox>
      <TextBox >
        <FontAwesomeIcon icon={faLock} />
        <input
          value={town}
          onChange={handleSetTownOnChange}
          type='town'
          name='town'
          placeholder='Ville'
        />
        <HiddenLabel htmlFor='town'>
          Town
        </HiddenLabel>
      </TextBox>

      <Button>Suivant</Button>
    </form >
  );
};

export default RegisterPersonal;
