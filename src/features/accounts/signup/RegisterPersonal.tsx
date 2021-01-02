import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, TextBox, HiddenLabel, ErrorLabel } from '../../../components/styledComponents';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendarAlt, faBuilding, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { isNonNullChain } from "typescript";
import { addAge, addCity, addName, getNewAuth } from "../accountSlice";
import { useHistory } from "react-router-dom";

import IError from "../../../include/IError";

const RegisterPersonal = (): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();

    const auth = useSelector(getNewAuth);
    React.useEffect(() => {
        if (!auth || auth.passwd === "" || auth.email === "") {
            alert("Vous n'avez pas rentré tous les champs nécéssaires.")
            history.push('/Login');
        }
    }, [auth])

    const [name, setName] = React.useState("");
    const [age, setAge] = React.useState<number>(18);
    const [town, setTown] = React.useState("");
    const [globalErrors, setGlobalErrors] = React.useState<Array<IError>>([]);


    const handleOnChange = (event) => setName(event.target.value);

    const handleSetAgeOnChange = (event) => setAge(parseInt(event.target.value));

    //TODO: use a proper thing, not a simple textbox
    const handleSetTownOnChange = (event) => setTown(event.target.value);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        let errors = [];

        if (!name)
            errors = [...errors, { component: "name", label: "Veuillez spécifier votre nom." } as IError];
        if (!age)
            errors = [...errors, { component: "age", label: "Veuillez spécifier votre age." } as IError];
        else if (age && age < 18)
            errors = [...errors, { component: "age", label: "L'âge doit etre supérieur à 18 ans." } as IError];
        if (!town)
            errors = [...errors, { component: "town", label: "Veuillez spécifier votre ville." } as IError];

        setGlobalErrors(errors);
        if (errors.length < 1) {
            dispatch(addName(name));
            dispatch(addAge(age));
            dispatch(addCity(town));
            history.push('/SignUp/2');
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
            <TextBox borderColor={globalErrors.some(e => e.component === "name") ? 'red' : 'default'}>
                <FontAwesomeIcon icon={faUser} />
                <input
                    type='name'
                    value={name}
                    onChange={handleOnChange}
                    name='name'
                    placeholder='Prénom'
                />
                <HiddenLabel htmlFor="name">
                    Name
                </HiddenLabel>
            </TextBox>

            <TextBox borderColor={globalErrors.some(e => e.component === "age") ? 'red' : 'default'}>
                <FontAwesomeIcon icon={faCalendarAlt} />
                <input
                    value={age}
                    onChange={handleSetAgeOnChange}
                    type='number'
                    name='age'
                    placeholder='Age'
                    min={18}
                />
                <HiddenLabel htmlFor='age'>
                    Age
                </HiddenLabel>
            </TextBox>
            <TextBox borderColor={globalErrors.some(e => e.component === "town") ? 'red' : 'default'}>
                <FontAwesomeIcon icon={faBuilding} />
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

            <Button primary>Suivant</Button>
        </form >
    );
};

export default RegisterPersonal;
