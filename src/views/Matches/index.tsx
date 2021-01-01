import React from 'react';
import styled from '@emotion/styled';

import ProfileItem from '../../features/accounts/profile/ProfileItem';

const Title = styled.h1`
    text-align: center;
`;

const ProfileList = styled.ul`
    list-style-type: none;
    padding: 0 40px;

    &>li {
        margin: 5px;
    }
`;

const MyMatches = (): JSX.Element => {
    return (
        <div>
            <Title>Mes matchs</Title>
            <ProfileList>
                <ProfileItem id={0} />
                <ProfileItem id={2} />
            </ProfileList>
        </div>
    );
}

export default MyMatches;