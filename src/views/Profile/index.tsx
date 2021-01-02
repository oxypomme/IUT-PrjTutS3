import React from "react";
import ProfileCard from "../../features/accounts/profile/ProfileCard";

export function Profile(): JSX.Element {
    return (
        <div className='App'>
            <div>
                <h2>Mon Profil</h2>
                <ProfileCard />
            </div>
        </div>
    );

}