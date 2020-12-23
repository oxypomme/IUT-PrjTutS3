import React from "react";
import { useDispatch } from "react-redux";

import { TextBox, HiddenLabel } from '../../../components/styledComponents';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { isNonNullChain } from "typescript";
import { addDesc } from "../accountSlice";

import IError from "../../../include/IError";

export const Description = (): JSX.Element => {
    const dispatch = useDispatch();

    const [description, setDescription] = React.useState();

    const handleSetDescriptionOnChange = (event) => setDescription(event.target.value);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        let errors = [];

        if (!description || (description && description === isNonNullChain))
            errors = [...errors, { component: "description", label: "Veuillez spécifier votre description." } as IError];

    };

    return (
        <form onSubmit={handleOnSubmit}>
            <TextBox >
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