import React from 'react';
import { useSelector } from "react-redux";

import styled from '@emotion/styled';

export const CheckBoxContainer = styled.p`
    text-align: left;
    margin: 0;
    font-size: .8rem;
    color: #525252;

    // TODO fix broken css
    &>input[type=checkbox] {
        /* display: none; */
    }

    /* &>input[type=checkbox] + label {
        height: 12px;
        width: 12px;
        border: white solid 2px;
        background-color: #00000000;
        border-radius: 2px;
        position: relative;
        display: inline-block;
        top: 2px;
        cursor: pointer;
    }

    &>input[type=checkbox] + label::before {
        content: '';
        position: relative;
        top: -5px;
        line-height: 12px;
    }

    &>input[type=checkbox]:checked + label{
        background-color: #ffffff;
        color: #000000;
    }

    &>input[type=checkbox]:checked + label::before {
        content: '✔';
    } */
`;



const CheckBox = ({ onChange, content }: any): JSX.Element => {
    const [checked, setChecked] = React.useState<boolean>(false);

    const handleOnChange = (event) => {
        setChecked(event.target.checked)

        onChange(event);
        //? if the style need to be changed with script, do it here
    }

    return (
        <CheckBoxContainer>
            <input
                type="checkbox"
                name="checkbox"
                onChange={handleOnChange}
            />
            {/* <label htmlFor="checkbox"></label> */}
            <span>{content || ""}</span>
        </CheckBoxContainer>
    );
}

export default CheckBox;