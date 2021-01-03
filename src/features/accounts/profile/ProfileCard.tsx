import React from 'react';
import { useSelector } from "react-redux";

import { getAllProfiles, getCurrProfile } from '../profileSlice';

import IProfile from '../../../include/IProfile';

import ProfileComponent from './ProfileComponent';

const ProfileCard = ({ id }: { id?: string }): JSX.Element => {
    const currProfile: IProfile = useSelector(getCurrProfile);
    const profiles: IProfile[] = useSelector(getAllProfiles);
    const profile: IProfile = profiles?.find(p => p.authId === id) || currProfile;

    return (
        <ProfileComponent profile={profile} isMatchable={profile != currProfile} />
    );
}

export default ProfileCard;