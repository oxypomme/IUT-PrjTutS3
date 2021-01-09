import React from 'react';
import styled from '@emotion/styled';
import { ProfilePicture } from '../accounts/profile/ProfileComponent';
import IProfile from '../../include/IProfile';
import IMessage from '../../include/IMessage';
import { WaitingForData } from '../../components/styledComponents';

const Item = styled.li<{ read?: boolean }>`
    width: 100%;
    padding: 5px;
    margin: 0;
    padding-right: 0;
    cursor: pointer;
    border-left: ${props => "8px solid " + (props.read ? "var(--accent1)" : "#00000000")};
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

    &:active {
        border-left: 8px solid var(--accent2);
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
        text: "Ce message est trop long pour faire des tests :eyes:",
        media: ""
    },
    read: true,
    date: new Date(2021, 0, 8, 15, 28, 46)
}

const ChatMenuItem = ({ onClick, profile }: PropsType) => {
    return (
        <Item read={profile?.authId !== lastMessage?.sender && !lastMessage?.read}>
            <TitleContainer>
                <ImageProfileContainer>
                    <ProfilePicture source={profile.imageURL} />
                </ImageProfileContainer>
                <div>
                    <h2>{profile?.name || <WaitingForData length={8} />}</h2>
                    <p>hh:mm</p>
                </div>
            </TitleContainer>
            <p>{lastMessage?.content?.text || <WaitingForData length={16} />}</p>
        </Item>
    );
}

export default ChatMenuItem;