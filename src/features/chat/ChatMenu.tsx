import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import ChatMenuItem from './ChatMenuItem';

import { getAllProfiles } from '../accounts/profileSlice';
import { getChats } from './chatSlice';
import { getIngoingMatches, getOutgoingMatches } from '../accounts/matches/matchesSlice';

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
    activeProfile: IProfile;
    onClick: (profile: IProfile) => void;
}

const ChatMenu = ({ activeProfile, onClick }: PropsType) => {
    const inMatches = useSelector(getIngoingMatches);
    const outMatches = useSelector(getOutgoingMatches);
    const profiles = useSelector(getAllProfiles);

    const [chattableProfiles, setChattableProfiles] = React.useState<IProfile[]>([]);

    React.useEffect(() => {
        let profs: IProfile[] = [];
        for (const key in outMatches) {
            if (inMatches && Object.keys(inMatches).findIndex((value) => value == key) != -1 && !(outMatches[key].isBlocked || inMatches[key].isBlocked)) {
                const pIndex = profiles.findIndex((value) => value.authId == key);
                if (pIndex != -1 && !profs.includes(profiles[pIndex])) {
                    profs = [...profs, profiles[pIndex]]
                }
            }
        }
        setChattableProfiles(profs);
    }, [inMatches, profiles]);

    return (
        <List>
            { chattableProfiles
                ? chattableProfiles.map((profile, index) =>
                    <ChatMenuItem key={index} profile={profile} onClick={() => onClick(profile)} isActive={activeProfile == profile} />)
                : <></>}
        </List>
    );
}

export default ChatMenu;