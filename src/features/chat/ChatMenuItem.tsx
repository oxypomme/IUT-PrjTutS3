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
        margin: 4px 6px;
        font-style: italic;
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    h2 {
        margin: 0;
        font-size: 1rem;
        line-height: 1rem;
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

    &>div:last-of-type {
        display: block;

        &>p {
            margin: 0;
        }
    }
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
                <div>
                    <h2>{profile.name}</h2>
                    <p>hh:mm</p>
                </div>
            </TitleContainer>
            <p>Ce message est trop long pour faire des tests :eyes:</p>
        </Item>
    );
}

export default ChatMenuItem;