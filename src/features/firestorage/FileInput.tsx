import React from 'react';
import styled from '@emotion/styled';

import { Button } from '../../components/styledComponents';

const Container = styled.div`
    position: relative;
	width: 100%;
    height: 32px;
`;

const Input = styled.input`
	display: none;
`;

const ButtonAsLabel = Button.withComponent('label');
const Label = styled(ButtonAsLabel)`
    position: absolute;
    width: 100%;
    margin: 0;
    font-size: 13.333px;
    text-align: center;
    & > div {
        margin: 7.5px 0;
    }
`;

type PropsType = {
    onChange: ((event: React.SyntheticEvent) => void)
}

const FileInput = ({ onChange }: PropsType): JSX.Element => {
    const inputRef = React.useRef(null);
    const handleClick = (event: React.SyntheticEvent) => {
        event.preventDefault();
        inputRef.current.click();
        return false;
    }

    return (
        <Container>
            <Input type="file" name="file" onChange={onChange} accept="image/png, image/jpeg" ref={inputRef} />
            <Label htmlFor="file" tabIndex={0} onClick={handleClick}>
                <div>Charger un fichier</div>
            </Label>
        </Container>
    );
}

export default FileInput;