import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

import { Button, HiddenLabel, TextBox, WaitingForData } from '../../components/styledComponents';
import { ProfilePicture } from '../accounts/profile/ProfileComponent';
import ChatContentItem from './ChatContentItem';

import { getCurrProfile } from '../accounts/profileSlice';
import { getInChat, getOutChat, newMessage } from './chatSlice';

import IProfile from '../../include/IProfile';
import IMessage from '../../include/IMessage';

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
`;

const ContentContainer = styled.ul`
    flex-grow:1;
    /*scroll-behavior: smooth;*/
    list-style-type: none;
    padding: 0;
    margin: 0;
    overflow-y: auto;
`;

const InputContainer = styled.form`
    display: flex;
    padding: 4px;
    background: var(--background2);
`;

const ChatTextBox = styled(TextBox)`
    width: 100%;
`;
const ChatButton = styled(Button)`
    height: 100%;
    margin: 0 5px;
`;

type PropsType = {
    profile: IProfile;
    onClick?: (event: React.SyntheticEvent) => void;
}

const ChatContent = ({ onClick, profile }: PropsType) => {
    const dispatch = useDispatch();

    const currProfile = useSelector(getCurrProfile);
    const rawInMessages = useSelector(getInChat);
    const rawOutMessages = useSelector(getOutChat);

    const [messages, setMessages] = React.useState<IMessage[]>([]);
    const [textMessage, setTextMessage] = React.useState<string>("");

    React.useEffect(() => {
        if (Object.keys(rawInMessages).length > 0 && Object.keys(rawOutMessages).length > 0) {
            let msgs: IMessage[] = [];
            for (const key in rawInMessages) {
                if (rawInMessages[key]?.sender == profile.authId) {
                    msgs = [...msgs, rawInMessages[key]];
                }
            }
            for (const key in rawOutMessages) {
                if (rawOutMessages[key]?.target == profile.authId) {
                    msgs = [...msgs, rawOutMessages[key]];
                }
            }
            setMessages(msgs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
        }
    }, [rawInMessages, rawOutMessages]);

    const messageRef = React.useRef(null);
    React.useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }, [messages])

    const handleOnTextChange = (event) => setTextMessage(event.target.value);

    const handleOnTextSubmit = (event: React.BaseSyntheticEvent) => {
        event.preventDefault();
        dispatch(newMessage({
            sender: currProfile.authId,
            target: profile.authId,
            content: {
                text: textMessage,
                media: ""
            },
            read: true,
            date: new Date().toLocaleString('en-GB')
        }));
        setTextMessage("");
    }

    return (
        <MainContainer>
            <TitleContainer> {/* HEADER */}
                <ImageProfileContainer>
                    <ProfilePicture source={profile.imageURL} />
                </ImageProfileContainer>
                <p>{profile?.name || <WaitingForData length={8} />}</p>
            </TitleContainer>
            <ContentContainer ref={messageRef}>
                {messages.map((message, index) => (
                    <ChatContentItem key={index} profile={currProfile} message={message} />
                ))}
            </ContentContainer>
            <InputContainer>
                <ChatTextBox>
                    <FontAwesomeIcon icon={faComments} />
                    <input
                        type='text'
                        name='message'
                        placeholder='Message'
                        value={textMessage}
                        onChange={handleOnTextChange}
                    />
                    <HiddenLabel htmlFor='message'>
                        Message
                    </HiddenLabel>
                </ChatTextBox>
                <ChatButton
                    primary
                    onClick={handleOnTextSubmit}
                >
                    Envoyer
                </ChatButton>
            </InputContainer>
        </MainContainer>
    );
}

export default ChatContent;