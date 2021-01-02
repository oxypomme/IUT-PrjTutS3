import React from 'react';

import SelectionProfiles from '../../features/accounts/selection/SelectionProfiles';

export function Home(): JSX.Element {
    return (
        <div className="App">
            <h2>Profils :</h2>
            <SelectionProfiles />
        </div>
    );
}