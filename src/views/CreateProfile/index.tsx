import React from "react";
import RegisterPersonal from '../../features/accounts/signup/RegisterPersonal';

export function CreateProfile(): JSX.Element {
    return (
        <div className='App'>
            <div>
                <h2>Formulaire</h2>
                <RegisterPersonal />
            </div>
        </div>
    );
}