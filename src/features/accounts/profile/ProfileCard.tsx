import React from 'react';
import { useSelector } from "react-redux";

import { getAllProfiles, getCurrProfile } from '../profileSlice';
import { getAuthId } from '../accountSlice';

import IProfile from '../../../include/IProfile';

import ProfileComponent from './ProfileComponent';
import ProfileEdit from './ProfileEdit';

const ProfileCard = ({ id }: { id?: string }): JSX.Element => {
    const currProfile: IProfile = useSelector(getCurrProfile);
    const profiles: IProfile[] = useSelector(getAllProfiles);
    const uid: string = useSelector(getAuthId);
    const profile: IProfile = profiles?.find(p => p.authId === id) || currProfile;

    const [isEditing, setIsEditing] = React.useState<boolean>(false);

    const toggleIsEditing = (event) => {
        event.preventDefault();
        setIsEditing(!isEditing);
    }

    if (!isEditing) {
        return (
            <ProfileComponent profile={profile} isMatchable={profile !== currProfile} isDeletable={uid !== "" && profile === currProfile} handleEditProfile={toggleIsEditing} />
        );
    }
    else {
        return (
            <ProfileEdit profile={profile} />
        );
    }

}

export default ProfileCard;