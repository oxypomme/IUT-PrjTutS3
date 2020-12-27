import React from "react";
import { useDispatch } from "react-redux";

import { TextBox, HiddenLabel, ErrorLabel } from '../../../components/styledComponents';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faUser } from "@fortawesome/free-solid-svg-icons";
import { isNonNullChain } from "typescript";
import { addDesc } from "../accountSlice";

import IError from "../../../include/IError";
import { useHistory } from "react-router-dom";

export const Description = (): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [description, setDescription] = React.useState();
    const [globalErrors, setGlobalErrors] = React.useState<Array<IError>>([]);

    const handleSetDescriptionOnChange = (event) => setDescription(event.target.value);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        let errors = [];

        if (!description || (description && description === isNonNullChain))
            errors = [...errors, { component: "description", label: "Veuillez spécifier votre description." } as IError];

        setGlobalErrors(errors);
        if (errors.length < 1) {
            dispatch(addDesc(description));
            history.push('/SignUp/4');
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
            <TextBox borderColor={globalErrors.some(e => e.component === "name") ? 'red' : 'default'}>
                <FontAwesomeIcon icon={faUser} />
                <input
                    type=''
                    value={description}
                    onChange={handleSetDescriptionOnChange}
                    name='description'
                    placeholder='Description '
                />
                <HiddenLabel htmlFor="descriptionl">
                    Description
                </HiddenLabel>
            </TextBox>
        </form >
    );
};

export default Description;