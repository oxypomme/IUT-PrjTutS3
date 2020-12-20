import React from "react";

import MyProfile from "../../features/accounts/profile/MyProfile";

export function Profile(): JSX.Element {
    return (
        <div className='App'>
            <div>
                <h2>Mon Profil</h2>
                <MyProfile />
            </div>
        </div>
    );

}