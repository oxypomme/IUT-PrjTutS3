import React from "react";
import RegisterPersonal from '../../features/accounts/signup/RegisterPersonal';

import { Gender } from "../../features/accounts/signup/Gender";
import { Orientation } from "../../features/accounts/signup/Orientation";
import { Tags } from "../../features/accounts/signup/Tags";

export function CreatePersonal(): JSX.Element {
    return (
        <div className='App'>
            <div>
                <h2>Formulaire</h2>
                <RegisterPersonal />
            </div>
        </div>
    );
}

export function CreatePreferences(): JSX.Element {
    return (
        <div className='App'>
            <div>
                <h2>Formulaire</h2>
                <Gender />
                <Orientation />
                <Tags />
            </div>
        </div>
    );
}