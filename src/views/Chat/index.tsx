import React from 'react';
import styled from '@emotion/styled';

import ChatMenu from '../../features/chat/ChatMenu';

const ChatApp = styled.div`
    height: 100vh;
`;

const ChatMenuContainer = styled.div`
    height: 100%;
    width: 280px;
    background: white;
`;

const Chat = () => {
    return (
        <ChatApp className='App'>
            <ChatMenuContainer>
                <ChatMenu />
            </ChatMenuContainer>
        </ChatApp>
    );
}

export default Chat;