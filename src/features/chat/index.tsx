import React from 'react';
import styled from '@emotion/styled';

import ChatMenu from './ChatMenu';
import ChatContent from './ChatContent';

import IProfile from '../../include/IProfile';

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
    height: 100%;
    width: calc(100vw - 280px);
    left: 280px;
    background: var(--background1);
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
                {profile ? <ChatContent profile={profile} /> : <></>}
            </ChatContentContainer>
        </ChatApp>
    );
}

export default Chat;