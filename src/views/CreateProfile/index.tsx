import React from "react";

import RegisterPersonal from '../../features/accounts/signup/RegisterPersonal';
import { RegisterPreferences } from "../../features/accounts/signup/RegisterPreferences";
import { RegisterPublicInfos } from "../../features/accounts/signup/RegisterPublicInfos";
import ResumeInfos from "../../features/accounts/signup/ResumeInfos";

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
    return (
        <div className='App login only'>
            <div>
                <h2>Finalisation</h2>
                <RegisterPublicInfos />
            </div>
        </div >
    );
}

export function CreateConfirm(): JSX.Element {
    return (
        <div className='App only'>
            <div>
                <h2>Confirmation</h2>
                <ResumeInfos />
            </div>
        </div >
    );
}