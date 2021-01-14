import React from 'react';
import styled from '@emotion/styled';
import SurpriseMatch from '../../features/accounts/selection/SurpriseMatch';

const Title = styled.h1`
    text-align: center;
`;

const Surprise = (): JSX.Element => {
    return (
        <div>
            <Title>Vous avez matché avec :</Title>
            <SurpriseMatch />
        </div>
    );
}

export default Surprise;