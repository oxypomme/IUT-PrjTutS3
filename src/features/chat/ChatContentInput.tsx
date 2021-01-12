import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro, faComments, faMicrophone } from '@fortawesome/free-solid-svg-icons';

import { Button, HiddenLabel, TextBox } from '../../components/styledComponents';
import UploadFile from '../firestorage/UploadFile';
import UploadMicRecord from '../firestorage/UploadMicRecord';

import IProfile from '../../include/IProfile';

import { getCurrProfile } from '../accounts/profileSlice';
import { newMessage } from './chatSlice';

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

const ImageContainer = styled.div<{ isShowing?: boolean }>`
    background-color: #3333337D;
    position: absolute;
    top:0;
    left:0;
    width: calc(100vw - 5px);
    height: 100vh;
    z-index: 10000;

    display: ${props => props.isShowing ? 'flex' : 'none'};

    & > div {
        margin: auto;
    }
`;

const ChatContentInput = ({ profile }: PropsType) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const currProfile = useSelector(getCurrProfile);

    const [showUploadImage, setShowUploadImage] = React.useState(false);
    const [showUploadMicRecord, setShowUploadMicRecord] = React.useState(false);

    const [textMessage, setTextMessage] = React.useState<string>("");
    const [mediaString, setMediaString] = React.useState<string>("");
    const [mediaBlob, setMediaBlob] = React.useState<Blob>(undefined);
    const [mediaType, setMediaType] = React.useState<string>("");

    const handleOnTextChange = (event) => setTextMessage(event.target.value);

    const handleOnTextSubmit = (event: React.BaseSyntheticEvent) => {
        event.preventDefault();
        if (textMessage || mediaType) {
            if (mediaType === "audios") {
                dispatch(newMessage({
                    sender: currProfile.authId,
                    target: profile.authId,
                    content: {
                        text: textMessage,
                        media: mediaBlob,
                        type: mediaType
                    },
                    read: false,
                    date: new Date().toLocaleString('en-GB')
                }, "uploadFile"));
                setMediaBlob(undefined);
            } else {
                dispatch(newMessage({
                    sender: currProfile.authId,
                    target: profile.authId,
                    content: {
                        text: textMessage,
                        media: mediaString,
                        type: mediaType
                    },
                    read: false,
                    date: new Date().toLocaleString('en-GB')
                }));
                setMediaString("");
            }
            setTextMessage("");
            setMediaType("");
        }
        else {
            alert.error("Vous ne pouvez pas envoyer un message vide.");
        }
    }

    const handleMicroClick = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setShowUploadMicRecord(true);
    }

    const handleImageClick = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setShowUploadImage(true);
    }

    const handleImageSend = (event: React.SyntheticEvent, picture: string) => {
        event.preventDefault();
        setMediaString(picture);
        setMediaType("images")
        setShowUploadImage(false);
    }

    const handleImageCancel = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setMediaType("")
        setShowUploadImage(false);
    }

    const handleMicRecordSend = (event: React.SyntheticEvent, micRecord: Blob) => {
        event.preventDefault();
        setMediaBlob(micRecord);
        setMediaType("audios")
        setShowUploadMicRecord(false);
    }

    const handleMicRecordCancel = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setMediaType("")
        setShowUploadMicRecord(false);
    }


    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            handleOnTextSubmit(event);
        }
    }

    return (
        <InputContainer>
            <ImageContainer isShowing={showUploadImage}>
                <UploadFile onOk={handleImageSend} onCancel={handleImageCancel} />
            </ImageContainer>
            <ImageContainer isShowing={showUploadMicRecord}>
                <UploadMicRecord onOk={handleMicRecordSend} onCancel={handleMicRecordCancel} />
            </ImageContainer>
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
            <FontAwesomeIcon icon={faMicrophone} size="2x" color={mediaType === "audios" ? "var(--accent2)" : "gray"} tabIndex={100} onClick={handleMicroClick} />
            <FontAwesomeIcon icon={faCameraRetro} size="2x" color={mediaType === "images" ? "var(--accent2)" : "gray"} tabIndex={101} onClick={handleImageClick} />
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