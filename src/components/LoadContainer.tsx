import React from 'react';
import styled from '@emotion/styled';
import { FrontContainer } from './styledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { keyframes } from '@emotion/react';

const InfiniteRotate = keyframes`
    from {
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
`;

const IconContainer = styled.div`
    position: absolute;
    top: -100px;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > svg {
        color: white;
        animation: ${InfiniteRotate} 2s linear infinite;
    }
`;

const StyledFrontContainer = styled(FrontContainer)`
    position: fixed;
    margin: 0 !important;

    & > div {
        width: 80%;
    }
`;

type PropsType = {
    isShowing: boolean;
    loadIcon?: boolean;
    children?: React.ReactNode;
}

const LoadContainer = ({ isShowing, loadIcon, children }: PropsType) => {
    if (isShowing) {
        return (
            <StyledFrontContainer isShowing={isShowing}>
                <div>
                    {loadIcon &&
                        <IconContainer>
                            <FontAwesomeIcon icon={faSyncAlt} size="6x" />
                        </IconContainer>
                    }
                    {children}
                </div>
            </StyledFrontContainer>
        );
    }
    else {
        return <></>;
    }
}

export default LoadContainer;