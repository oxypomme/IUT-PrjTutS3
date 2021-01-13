import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import moment from 'moment';

import ChatContentItem from './ChatContentItem';

import { getInChat, getOutChat } from './chatSlice';

import IProfile from '../../include/IProfile';
import IMessage from '../../include/IMessage';
import CoverImage from '../../components/CoverImage';
import UploadProgress from '../firestorage/UploadProgress';

const MainContainer = styled.div`
    height:calc(100% - 61px);
	display:flex;
	flex-direction:column;
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

const StyledUploadProgress = styled(UploadProgress)`
    position: absolute;
    width: calc(100% - 323px);
    bottom: 65px;
    right: 0;
    height: 20px;
`;

type PropsType = {
    profile: IProfile;
    onClick?: (event: React.SyntheticEvent) => void;
}

const ChatContent = ({ onClick, profile }: PropsType) => {

    const rawInMessages = useSelector(getInChat);
    const rawOutMessages = useSelector(getOutChat);

    const [messages, setMessages] = React.useState<IMessage[]>([]);
    const [bigImage, setBigImage] = React.useState<string>(undefined);

    const onImageClick = (link: string) => {
        console.log(link);
        setBigImage(link);
    }

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
        setMessages(msgs.sort((a, b) => moment(a.date, "DD-MM-YYYY, HH:mm:SS").toDate().getTime() - moment(b.date, "DD-MM-YYYY, HH:mm:SS").toDate().getTime()));
    }, [rawInMessages, rawOutMessages, profile]);

    const messageRef = React.useRef(null);
    React.useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }, [messages])

    return (
        <MainContainer>
            <CoverImage src={bigImage} onClick={() => setBigImage(undefined)} />
            <ContentContainer ref={messageRef}>
                {messages.map((message, index) => (
                    <ChatContentItem key={index} message={message} isOwner={profile?.authId !== message?.sender} onImageClick={onImageClick} />
                ))}
            </ContentContainer>
            <StyledUploadProgress />
        </MainContainer>
    );
}

export default ChatContent;