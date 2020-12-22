import React from 'react';

import logo from '../../logo.svg';

import SelectionProfiles from '../../features/accounts/selection/SelectionProfiles';
import ProfileCard from '../../features/accounts/profile/ProfileCard';

export function Home(): JSX.Element {
    return (
        <div className="App">
            <h2>Profils :</h2>
            <SelectionProfiles />
            <ProfileCard id={0} />
        </div>
    );
}