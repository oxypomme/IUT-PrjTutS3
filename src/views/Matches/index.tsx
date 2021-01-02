import React from 'react';
import styled from '@emotion/styled';

import MyMatches from '../../features/accounts/matches/MatchesList';

const Title = styled.h1`
    text-align: center;
`;

const Matches = (): JSX.Element => {
    return (
        <div>
            <Title>Mes matchs</Title>
            <MyMatches />
        </div>
    );
}

export default Matches;