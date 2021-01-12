import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import { WaitingForData } from '../../components/styledComponents';
import { ProfilePicture } from '../accounts/profile/ProfileComponent';
import ChatContentItem from './ChatContentItem';

import { getCurrProfile } from '../accounts/profileSlice';
import { getInChat, getOutChat } from './chatSlice';

import IProfile from '../../include/IProfile';
import IMessage from '../../include/IMessage';
import ChatContentInput from './ChatContentInput';

const ImageProfileContainer = styled.div`
    width: 45%;
    max-width: 75px;
    margin: 0;
    margin-right: 15px;
`;

const MainContainer = styled.div`
    height:100%;
	display:flex;
	flex-direction:column;
`;

const TitleContainer = styled.div`
    display: flex;
    border-left: 8px solid var(--accent2);
    padding: 4px;
    background: var(--background2);

    & > p {
        font-weight: bold;
    }
`;

const ContentContainer = styled.ul`
    flex-grow:1;
    /*scroll-behavior: smooth;*/
    list-style-type: none;
    padding: 0;
    margin: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
`;

type PropsType = {
    profile: IProfile;
    onClick?: (event: React.SyntheticEvent) => void;
}

const ChatContent = ({ onClick, profile }: PropsType) => {
    const rawInMessages = useSelector(getInChat);
    const rawOutMessages = useSelector(getOutChat);

    const [messages, setMessages] = React.useState<IMessage[]>([]);

    React.useEffect(() => {
        let msgs: IMessage[] = [];
        if (rawInMessages && Object.keys(rawInMessages).length > 0) {
            for (const key in rawInMessages) {
                if (rawInMessages[key]?.sender === profile.authId) {
                    msgs = [...msgs, rawInMessages[key]];
                }
            }
        }

        if (rawOutMessages && Object.keys(rawOutMessages).length > 0) {
            for (const key in rawOutMessages) {
                if (rawOutMessages[key]?.target === profile.authId) {
                    msgs = [...msgs, rawOutMessages[key]];
                }
            }
        }
        setMessages(msgs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    }, [rawInMessages, rawOutMessages, profile]);

    const messageRef = React.useRef(null);
    React.useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }, [messages])

    return (
        <MainContainer>
            <TitleContainer>
                <ImageProfileContainer>
                    <ProfilePicture source={profile.imageURL} />
                </ImageProfileContainer>
                <p>{profile?.name || <WaitingForData length={8} />}</p>
            </TitleContainer>
            <ContentContainer ref={messageRef}>
                {messages.map((message, index) => (
                    <ChatContentItem key={index} message={message} isOwner={profile?.authId !== message?.sender} />
                ))}
            </ContentContainer>
            <ChatContentInput profile={profile} />
        </MainContainer>
    );
}

export default ChatContent;