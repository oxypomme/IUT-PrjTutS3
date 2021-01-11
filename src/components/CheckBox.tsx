import React from 'react';
import { useSelector } from "react-redux";

import styled from '@emotion/styled';

export const CheckBoxContainer = styled.p`
    text-align: left;
    margin: 0;
    font-size: .8rem;
    color: #525252;

    &>input[type=checkbox] {
        vertical-align: middle;
    }
`;



const CheckBox = ({ onChange, content }: any): JSX.Element => {
    const [checked, setChecked] = React.useState<boolean>(false);

    const handleOnChange = (event) => {
        setChecked(event.target.checked)

        onChange(event);
    }

    return (
        <CheckBoxContainer>
            <input
                type="checkbox"
                name="checkbox"
                onChange={handleOnChange}
            />
            <span>{content || ""}</span>
        </CheckBoxContainer>
    );
}

export default CheckBox;