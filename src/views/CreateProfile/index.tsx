import React from "react";
import RegisterPersonal from '../../features/accounts/signup/RegisterPersonal';

import { Gender } from "../../features/accounts/signup/Gender";
import { Orientation } from "../../features/accounts/signup/Orientation";
import { Tags } from "../../features/accounts/signup/Tags";
import { Description } from "../../features/accounts/signup/Description";
import { ProfPicture } from "../../features/accounts/signup/ProfPicture";

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
                <Gender />
                <Orientation />
                <Tags />
            </div>
        </div >
    );
}

export function CreateFinishing(): JSX.Element {
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