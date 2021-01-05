import React from 'react';
import styled from '@emotion/styled';
import { ProfilePicture } from '../accounts/profile/ProfileComponent';
import IProfile from '../../include/IProfile';

const Item = styled.li`
    width: calc(100% - 5px);
    padding: 5px;
    padding-right: 0;
    cursor: pointer;

    p {
        margin: 5px 10px;
        font-style: italic;
        
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    h2 {
        margin: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    &:hover {
        background: silver;
    }
`;

const ImageProfileContainer = styled.div`
    width: 45%;
    max-width: 75px;
    margin: 0;
    margin-right: 15px;
`;

const TitleContainer = styled.div`
    display: flex;
`;


type PropsType = {
    profile: IProfile;
    onClick?: (event: React.SyntheticEvent) => void;
}

const ChatMenuItem = ({ onClick, profile }: PropsType) => {
    return (
        <Item>
            <TitleContainer>
                <ImageProfileContainer>
                    <ProfilePicture source={profile.imageURL} />
                </ImageProfileContainer>
                <h2>{profile.name}</h2>
            </TitleContainer>
            <p>hh:mm - Dernier message trop long ptdr</p>
        </Item>
    );
}

export default ChatMenuItem;