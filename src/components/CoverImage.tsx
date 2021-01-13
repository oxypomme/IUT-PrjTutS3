import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
    /* display: flex;
    flex-direction: column;
    width: fit-content;
    padding: 5px;
    overflow: hidden;

    background: var(--background2);
    border-radius: 10px; */
    background-color: #333333aa;
    position: absolute;
    top:0;
    left:0;
    width: calc(100vw - 5px);
    height: 100vh;
    z-index: 10000;

    & > * {
        margin: auto;
    }
`;

const BigImage = styled.img`
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    max-width: 90%;
    max-height: 90%;
`;

type PropsType = {
    src: string;
    onClick?: (event: React.SyntheticEvent) => void;
}

const handleImageClick = (event) => {
    event.stopPropagation();
}

const SelectGiphy = ({ onClick, src }: PropsType) => {
    if (src) {
        return (
            <Container onClick={onClick}>
                <BigImage src={src} alt="Image is not loading" onClick={handleImageClick} />
            </Container>
        );
    }
    else {
        return <></>;
    }
}

export default SelectGiphy;