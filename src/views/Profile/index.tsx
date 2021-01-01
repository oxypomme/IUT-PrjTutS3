import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ProfileCard from "../../features/accounts/profile/ProfileCard";
import { getCurrProfile } from "../../features/accounts/profileSlice";
import { fetchTags } from "../../features/accounts/tagSlice";
import IProfile, { instanceOfIProfile } from "../../include/IProfile";

export function Profile(): JSX.Element {
    //TODO: Component for that pls
    const dispatch = useDispatch();
    const currProfile: IProfile | Record<string, never> = useSelector(getCurrProfile);
    React.useEffect(() => {
        if (instanceOfIProfile(currProfile)) {
            dispatch(fetchTags());
        }
    })

    return (
        <div className='App'>
            <div>
                <h2>Mon Profil</h2>
                <ProfileCard />
            </div>
        </div>
    );

}