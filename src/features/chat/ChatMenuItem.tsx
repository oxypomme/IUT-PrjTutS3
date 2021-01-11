import React from 'react';
import styled from '@emotion/styled';
import emoji from 'emoji-dictionary';

import { ProfilePicture } from '../accounts/profile/ProfileComponent';
import { WaitingForData } from '../../components/styledComponents';

import IProfile from '../../include/IProfile';
import IMessage from '../../include/IMessage';

const Item = styled.li<{ isActive?: boolean, read?: boolean }>`
    width: 100%;
    padding: 5px;
    margin: 0;
    padding-right: 0;
    cursor: pointer;
    border-left: ${props => "8px solid " + (props.read ? "var(--accent1)" : props.isActive ? "var(--accent2)" : "#00000000")};
    box-sizing: border-box;

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

    &:hover,
    &:active {
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

const lastMessage: IMessage = {
    sender: "KDZ5DWWFccRZuUoRgm3lcrrqumB2", // billy
    target: "vzy56Iw31dNVZhqeHDqygWUSTYV2",
    content: {
        text: "Ce message est trop :eyes: long pour faire des tests",
        media: ""
    },
    read: true,
    date: "11/01/2021, 11:45:51"
}

const ChatMenuItem = ({ onClick, profile }: PropsType) => {
    const [isActive, setIsActive] = React.useState(false);

    const handleOnClick = (event) => {
        setIsActive(!isActive); // TODO: multiple profiles
        onClick(event);
    }

    return (
        <Item read={profile?.authId !== lastMessage?.sender && !lastMessage?.read} onClick={handleOnClick} isActive={isActive}>
            <TitleContainer>
                <ImageProfileContainer>
                    <ProfilePicture source={profile.imageURL} />
                </ImageProfileContainer>
                <div>
                    <h2>{profile?.name || <WaitingForData length={8} />}</h2>
                    <p>{lastMessage?.date.toLocaleString() || < WaitingForData length={5} />}</p>
                </div>
            </TitleContainer>
            <p>{lastMessage?.content?.text.replace(/:[a-z]*:/i, (rawEmoji) => emoji.getUnicode(rawEmoji)) || <WaitingForData length={16} />}</p>
        </Item>
    );
}

export default ChatMenuItem;