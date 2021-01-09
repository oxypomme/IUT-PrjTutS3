import React from 'react';
import styled from '@emotion/styled';

import ChatMenuItem from './ChatMenuItem';
import { useSelector } from 'react-redux';
import { getCurrProfile } from '../accounts/profileSlice';

const List = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    text-align: left;
    width: 100%;
    height: 100vh;
    overflow-y: auto;
`;

const ChatMenu = () => {
    const curr = useSelector(getCurrProfile);

    return (
        <List>
            <ChatMenuItem profile={curr} />
            <ChatMenuItem profile={curr} />
        </List>
    );
}

export default ChatMenu;