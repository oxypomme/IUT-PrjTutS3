import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import ChatMenuItem from './ChatMenuItem';

import { getAllProfiles } from '../accounts/profileSlice';
import { getChats } from './chatSlice';

import IProfile from '../../include/IProfile';

const List = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    text-align: left;
    width: 100%;
    height: 100vh;
    overflow-y: auto;
`;

type PropsType = {
    onClick: (profile: IProfile) => void;
}

const ChatMenu = ({ onClick }: PropsType) => {
    const chats = useSelector(getChats);
    const profiles = useSelector(getAllProfiles);

    const [chattableProfiles, setChattableProfiles] = React.useState<IProfile[]>([]);

    React.useEffect(() => {
        let profs: IProfile[] = [];
        for (const key in chats) {
            const pIndex = profiles.findIndex((value) => value.authId == chats[key].sender || value.authId == chats[key].target);
            if (pIndex != -1 && !profs.includes(profiles[pIndex])) {
                profs = [...profs, profiles[pIndex]]
            }
        }
        setChattableProfiles(profs);
    }, [chats, profiles]);

    return (
        <List>
            { chattableProfiles
                ? chattableProfiles.map((profile, index) =>
                    <ChatMenuItem key={index} profile={profile} onClick={() => onClick(profile)} />)
                : <></>}
        </List>
    );
}

export default ChatMenu;