import React from "react";
import RegisterPersonal from '../../features/accounts/signup/RegisterPersonal';

import { Description } from "../../features/accounts/signup/Description";
import { ProfPicture } from "../../features/accounts/signup/ProfPicture";
import { RegisterPreferences } from "../../features/accounts/signup/RegisterPreferences";

export function CreatePersonal(): JSX.Element {
    return (
        <div className='App login only'>
            <div>
                <h2>Formulaire</h2>
                <RegisterPersonal />
            </div>
        </div>
    );
}

export function CreatePreferences(): JSX.Element {
    return (
        <div className='App login only'>
            <div style={{ width: "clamp(300px, 500px, 800px)" }}>
                <h2>Formulaire</h2>
                <RegisterPreferences />
            </div>
        </div >
    );
}

export function CreateFinishing(): JSX.Element {
    //TODO
    return (
        <div className='App login only'>
            <div>
                <h2>Finalisation</h2>
                <ProfPicture />
                <Description />
            </div>
        </div >
    );
}