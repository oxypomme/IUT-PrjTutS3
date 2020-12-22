import React from 'react';

import logo from '../../logo.svg';

import SelectionProfiles from '../../features/accounts/selection/SelectionProfiles';
import MyProfile from '../../features/accounts/profile/MyProfile';

export function Home(): JSX.Element {
    return (
        <div className="App">
            <h2>Profils :</h2>
            <SelectionProfiles />
            <MyProfile id={0} />
        </div>
    );
}