import React from 'react';
import { useSelector } from "react-redux";

import { getAllProfiles, getCurrProfile } from '../profileSlice';

import IProfile from '../../../include/IProfile';
import ProfileComponent from './ProfileComponent';


const ProfileCard = ({ id }: any): JSX.Element => {
    const currProfile: IProfile = useSelector(getCurrProfile);
    const profiles: IProfile[] = useSelector(getAllProfiles);
    const profile: IProfile = profiles?.find(p => p.authId === id) || currProfile;

    return (
        <ProfileComponent profile={profile} />
    );
}

export default ProfileCard;