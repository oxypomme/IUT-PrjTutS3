import React from 'react';
import styled from '@emotion/styled';

import ChatMenu from './ChatMenu';
import ChatContent from './ChatContent';
import { ProfilePicture } from '../accounts/profile/ProfileComponent';
import { WaitingForData } from '../../components/styledComponents';

import IProfile from '../../include/IProfile';
import ChatInput from './ChatInput';

const ChatApp = styled.div`
    height: 100vh;
    display: flex;
`;

const ChatMenuContainer = styled.div`
    height: 100%;
    width: 280px;
    background: var(--background2);
`;

const ChatContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: calc(100% - 280px);
    left: 280px;
    background: var(--background1);
`;

const TitleContainer = styled.div`
    width: calc(100% - 16px);
    display: flex;
    border-left: 8px solid var(--accent2);
    padding: 4px;
    background: var(--background2);
    z-index: 99;

    & > p {
        font-weight: bold;
    }
`;

const ImageProfileContainer = styled.div`
    width: 45%;
    max-width: 75px;
    margin: 0;
    margin-right: 15px;
`;

const ChatContainer = styled.div`
    height: calc(100% - 61px);
`;

const Chat = ({ className }: any) => {
    const [profile, setProfile] = React.useState<IProfile>();

    const handleOnProfileClick = (profile: IProfile) => {
        setProfile(profile);
    }

    return (
        <ChatApp className={className}>
            <ChatMenuContainer>
                <ChatMenu onClick={handleOnProfileClick} activeProfile={profile} />
            </ChatMenuContainer>
            <ChatContentContainer>
                <TitleContainer>
                    <ImageProfileContainer>
                        <ProfilePicture source={profile?.imageURL} />
                    </ImageProfileContainer>
                    <p>{profile?.name || <WaitingForData length={8} />}</p>
                </TitleContainer>
                <ChatContainer>
                    {profile ? <ChatContent profile={profile} /> : <></>}
                    <ChatInput profile={profile} />
                </ChatContainer>
            </ChatContentContainer>
        </ChatApp>
    );
}

export default Chat;