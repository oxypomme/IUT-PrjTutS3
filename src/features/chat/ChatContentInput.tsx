import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro, faComments, faFileImage, faMicrophone } from '@fortawesome/free-solid-svg-icons';

import { Button, HiddenLabel, TextBox, FrontContainer } from '../../components/styledComponents';
import UploadFile from '../firestorage/UploadFile';
import UploadMicRecord from '../firestorage/UploadMicRecord';

import IProfile from '../../include/IProfile';

import { getCurrProfile } from '../accounts/profileSlice';
import { newMessage } from './chatSlice';
import SelectGiphy from './SelectGiphy';

const InputContainer = styled.form`
    display: flex;
    padding: 4px;
    background: var(--background2);

    & > svg {
        margin: auto;
    }

    & > *,
    & > svg {
        margin-right: 5px;
        margin-left: 5px;
        cursor: pointer;
    }
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
    const alert = useAlert();

    const currProfile = useSelector(getCurrProfile);

    const [showUploadImage, setShowUploadImage] = React.useState(false);
    const [showUploadMicRecord, setShowUploadMicRecord] = React.useState(false);
    const [showUploadGiphy, setShowUploadGiphy] = React.useState(false);

    const [textMessage, setTextMessage] = React.useState<string>("");

    const handleOnTextChange = (event) => setTextMessage(event.target.value);

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

    const handleMicroClick = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setShowUploadMicRecord(true);
    }

    const handleImageClick = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setShowUploadImage(true);
    }

    const handleGiphyClick = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setShowUploadGiphy(true);
    }

    const handleImageSend = (event: React.SyntheticEvent, picture: string) => {
        event.preventDefault();
        setShowUploadImage(false);
        sendMessage(textMessage, picture, "images");
        setTextMessage("");
    }

    const handleImageCancel = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setShowUploadImage(false);
    }

    const handleMicRecordSend = (event: React.SyntheticEvent, micRecord: Blob) => {
        event.preventDefault();
        setShowUploadMicRecord(false);
        sendMessage(textMessage, micRecord, "audios");
        setTextMessage("");
    }

    const handleMicRecordCancel = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setShowUploadMicRecord(false);
    }

    const handleGiphySend = (event: React.SyntheticEvent, gifLink: string) => {
        event.preventDefault();
        sendMessage(textMessage, gifLink, "giphy");
        setShowUploadGiphy(false);
    }

    const handleGiphyCancel = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setShowUploadGiphy(false);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            handleOnTextSubmit(event);
        }
    }

    return (
        <InputContainer>
            <FrontContainer isShowing={showUploadImage} onClick={handleImageCancel}>
                <UploadFile onOk={handleImageSend} onCancel={handleImageCancel} />
            </FrontContainer>
            <FrontContainer isShowing={showUploadMicRecord} onClick={handleMicRecordCancel}>
                <UploadMicRecord onOk={handleMicRecordSend} onCancel={handleMicRecordCancel} />
            </FrontContainer>
            <FrontContainer isShowing={showUploadGiphy} onClick={handleGiphyCancel}>
                <SelectGiphy onOk={handleGiphySend} onCancel={handleGiphyCancel} />
            </FrontContainer>
            <ChatTextBox>
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
            <FontAwesomeIcon
                icon={faMicrophone}
                size="2x"
                color={"silver"}
                tabIndex={100}
                onClick={handleMicroClick}
            />
            <FontAwesomeIcon
                icon={faCameraRetro}
                size="2x"
                color={"silver"}
                tabIndex={101}
                onClick={handleImageClick}
            />
            <FontAwesomeIcon
                icon={faFileImage}
                size="2x"
                color={"silver"}
                tabIndex={102}
                onClick={handleGiphyClick}
            />
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