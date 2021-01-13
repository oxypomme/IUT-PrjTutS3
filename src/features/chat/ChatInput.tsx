import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

import { Button, HiddenLabel, TextBox, } from '../../components/styledComponents';
import { ImagePicker, AudioPicker, GifPicker } from '../../components/Pickers';

import IProfile from '../../include/IProfile';

import { getCurrProfile } from '../accounts/profileSlice';
import { newMessage } from './chatSlice';

const InputContainer = styled.form`
    width: 100%;

    display: flex;
    padding: 4px;
    background: var(--background2);

    & > svg {
        margin: auto;
    }

    & > *,
    & > span > svg {
        margin-right: 5px;
        margin-left: 5px;
        cursor: pointer;
    }
`;

const ChatTextBox = styled(TextBox) <{ height?: number }>`
    width: 100%;
    min-height: 1em;
    max-height: 40px;
    height: ${props => props.height}px;
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
    const alert = useAlert();

    const currProfile = useSelector(getCurrProfile);

    const [textHeight, setTextHeight] = React.useState(0);
    const [textMessage, setTextMessage] = React.useState<string>("");

    const sendMessage = (text?: string, media?: string | Blob, type?: string) => {
        if (text || type) {
            const message = {
                sender: currProfile.authId,
                target: profile.authId,
                content: {
                    text,
                    media,
                    type
                },
                read: false,
                date: new Date().toLocaleString('en-GB')
            };

            if (type === "audios") {
                dispatch(newMessage(message, "uploadFile"));
            } else if (type === "giphy") {
                dispatch(newMessage(message, ""));
            } else {
                dispatch(newMessage(message));
            }
        }
        else {
            alert.error("Vous ne pouvez pas envoyer un message vide.");
        }
    }

    const handleOnTextSubmit = (event: React.BaseSyntheticEvent) => {
        event.preventDefault();
        sendMessage(textMessage);
        setTextMessage("");
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            handleOnTextSubmit(event);
        }
    }

    const handleOnTextChange = (event) => {
        setTextHeight(event.target.scrollHeight > event.target.clientHeight ? event.target.scrollHeight : textHeight);
        setTextMessage(event.target.value);
    }

    const handleOnActionPicker = (media: string | Blob, type: string) => {
        sendMessage(textMessage, media, type);
        setTextMessage("");
    }

    /*
                    <AudioPicker sendAction={handleOnActionPicker} />
            <ImagePicker sendAction={handleOnActionPicker} />
            <GifPicker sendAction={handleOnActionPicker} />
     */

    return (
        <InputContainer>
            <ChatTextBox height={textHeight}>
                <FontAwesomeIcon icon={faComments} />
                <ChatTextArea
                    name='message'
                    placeholder='Message'
                    value={textMessage}
                    onChange={handleOnTextChange}
                    tabIndex={0}
                    onKeyPress={handleKeyDown}
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