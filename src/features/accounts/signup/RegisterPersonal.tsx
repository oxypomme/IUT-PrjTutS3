import React from "react";
import { useDispatch } from "react-redux";

import { Button, TextBox, HiddenLabel } from '../../../components/styledComponents';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { isNonNullChain } from "typescript";
import { Tags } from './Tags';
import { addAge, addCity, addName } from "../accountSlice";
import { useHistory } from "react-router-dom";

const RegisterPersonal = (): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = React.useState();
    const [hasError, setHasError] = React.useState(false);
    const [age, setAge] = React.useState<number>();
    const [town, setTown] = React.useState();


    const handleOnChange = ({ target }) => {
        const { value: newName } = target;
        setName(newName);
        setHasError(name !== isNonNullChain);
    };

    const handleSetAgeOnChange = (event) => setAge(parseInt(event.target.value));

    //TODO: use a proper thing, not a simple textbox
    const handleSetTownOnChange = (event) => setTown(event.target.value);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const canSubmit = name && age && town && !hasError;
        if (canSubmit) {
            dispatch(addName(name));
            dispatch(addAge(age));
            dispatch(addCity(town));
            history.push('SignUp/2');
        }
    }

    return (
        <form onSubmit={handleOnSubmit}>
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
                    type='number'
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
            <Tags />
        </form >
    );
};

export default RegisterPersonal;
