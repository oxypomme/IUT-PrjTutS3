import React from 'react';
import styled from '@emotion/styled';

import ChatMenu from '../../features/chat/ChatMenu';
import { getCurrProfile } from '../../features/accounts/profileSlice';
import { useSelector } from 'react-redux';
import ChatContent from '../../features/chat/ChatContent';

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

const Chat = () => {
    const curr = useSelector(getCurrProfile);

    return (
        <ChatApp className='App'>
            <ChatMenuContainer>
                <ChatMenu />
            </ChatMenuContainer>
            <ChatContentContainer>
                <ChatContent profile={curr} />
            </ChatContentContainer>
        </ChatApp>
    );
}

export default Chat;