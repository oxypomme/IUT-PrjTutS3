import React from "react";
import { useDispatch } from "react-redux";

import { TextBox, HiddenLabel } from '../../../components/styledComponents';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { addDesc } from "../accountSlice";

import IError from "../../../include/IError";

export const Description = (): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [description, setDescription] = React.useState<string>();

    const handleSetDescriptionOnChange = (event) => setDescription(event.target.value);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        let errors = [];

        if (!description || description.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.([a-zA-Z0-9-]+){2,4}$/) === null)
            errors = [...errors, { component: "description", label: "L'email n'est pas valide." } as IError];

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