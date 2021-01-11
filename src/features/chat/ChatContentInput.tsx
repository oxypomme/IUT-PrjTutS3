import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

import { Button, HiddenLabel, TextBox } from '../../components/styledComponents';

import IProfile from '../../include/IProfile';

import { getCurrProfile } from '../accounts/profileSlice';
import { newMessage } from './chatSlice';

const InputContainer = styled.form`
    display: flex;
    padding: 4px;
    background: var(--background2);
`;

const ChatTextBox = styled(TextBox)`
    width: 100%;
`;
const ChatTextArea = styled.textarea`
    resize: none;
`;

const ChatButton = styled(Button)`
    height: 100%;
    margin: 0 5px;
`;

type PropsType = {
    profile: IProfile;
}

const ChatContentInput = ({ profile }: PropsType) => {
    const dispatch = useDispatch();

    const currProfile = useSelector(getCurrProfile);

    const [textMessage, setTextMessage] = React.useState<string>("");

    const handleOnTextChange = (event) => setTextMessage(event.target.value);

    const handleOnTextSubmit = (event: React.BaseSyntheticEvent) => {
        event.preventDefault();
        if (textMessage) {
            dispatch(newMessage({
                sender: currProfile.authId,
                target: profile.authId,
                content: {
                    text: textMessage,
                    media: ""
                },
                read: false,
                date: new Date().toLocaleString('en-GB')
            }));
            setTextMessage("");
        }
    }

    return (
        <InputContainer>
            <ChatTextBox>
                <FontAwesomeIcon icon={faComments} />
                <ChatTextArea
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
    );
}

export default ChatContentInput;