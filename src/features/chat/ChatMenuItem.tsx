import React from 'react';
import styled from '@emotion/styled';
import emoji from 'emoji-dictionary';
import Markdown from 'markdown-to-jsx';

import { ProfilePicture } from '../accounts/profile/ProfileComponent';
import { WaitingForData } from '../../components/styledComponents';

import IProfile from '../../include/IProfile';
import IMessage from '../../include/IMessage';
import { useSelector } from 'react-redux';
import { getInChat } from './chatSlice';

import markdownOptions from './MarkdownOverride';

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
    isActive: boolean;
    onClick?: (event: React.SyntheticEvent) => void;
}

const ChatMenuItem = ({ onClick, profile, isActive }: PropsType) => {
    const rawInMessages = useSelector(getInChat);

    const [lastMessage, setLastMessage] = React.useState<IMessage>();


    const handleOnClick = (event) => {
        onClick(event);
    }

    React.useEffect(() => {
        if (rawInMessages && Object.keys(rawInMessages).length > 0) {
            for (const key in rawInMessages) {
                if (rawInMessages[key]?.sender == profile.authId &&
                    (!lastMessage || (new Date(lastMessage.date).getTime() < new Date(rawInMessages[key].date).getTime()))) {
                    setLastMessage(rawInMessages[key]);
                }
            }
        }
    }, [rawInMessages, profile]);

    return (
        <Item read={profile?.authId !== lastMessage?.sender && !lastMessage?.read} onClick={handleOnClick} isActive={isActive}>
            <TitleContainer>
                <ImageProfileContainer>
                    <ProfilePicture source={profile.imageURL} />
                </ImageProfileContainer>
                <div>
                    <h2>{profile?.name || <WaitingForData length={8} />}</h2>
                    {lastMessage?.date.toLocaleString() || < WaitingForData length={5} />}
                </div>
            </TitleContainer>
            {<Markdown options={markdownOptions}>{lastMessage?.content?.text.replace(/:[a-z]*:/i, (rawEmoji) => emoji.getUnicode(rawEmoji))}</Markdown> || <WaitingForData length={16} />}
        </Item>
    );
}

export default ChatMenuItem;