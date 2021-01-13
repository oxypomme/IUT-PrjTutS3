import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from '@ramonak/react-progress-bar';
import { useAlert } from 'react-alert';
import moment from 'moment';

import { WaitingForData } from '../../components/styledComponents';
import { ProfilePicture } from '../accounts/profile/ProfileComponent';
import ChatContentItem from './ChatContentItem';

import { getCurrProfile } from '../accounts/profileSlice';
import { getInChat, getOutChat } from './chatSlice';
import { cancelUpload, getStorageProgress, getStorageWorking } from '../firestorage/storageSlice';

import IProfile from '../../include/IProfile';
import IMessage from '../../include/IMessage';
import ChatContentInput from './ChatContentInput';
import CoverImage from '../../components/CoverImage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import UploadProgress from '../firestorage/UploadProgress';

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

const ProgressContainer = styled.div<{ isShowing?: boolean }>`
    position: absolute;
    width: calc(100% - 323px);
    bottom: 65px;
    right: 0;
    height: 20px;
    background: #333;
    opacity: 0.75;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    visibility: ${props => props.isShowing ? "visible" : "hidden"};
    display: flex;

    & > * {
        flex: 0.95;
    }

    & > svg {
        margin-top: 2px;
        flex: 0.05;
    }
    & > svg:hover {
        cursor: pointer;
    }
`;

type PropsType = {
    profile: IProfile;
    onClick?: (event: React.SyntheticEvent) => void;
}

const ChatContent = ({ onClick, profile }: PropsType) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const rawInMessages = useSelector(getInChat);
    const rawOutMessages = useSelector(getOutChat);
    const storageWorkState = useSelector(getStorageWorking);
    const uploadProgress = useSelector(getStorageProgress);

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
            <TitleContainer>
                <ImageProfileContainer>
                    <ProfilePicture source={profile.imageURL} />
                </ImageProfileContainer>
                <p>{profile?.name || <WaitingForData length={8} />}</p>
            </TitleContainer>
            <ContentContainer ref={messageRef}>
                {messages.map((message, index) => (
                    <ChatContentItem key={index} message={message} isOwner={profile?.authId !== message?.sender} onImageClick={onImageClick} />
                ))}
            </ContentContainer>
            <UploadProgress />
            <ChatContentInput profile={profile} />
        </MainContainer>
    );
}

export default ChatContent;