import React from "react";
import RegisterPersonal from '../../features/accounts/signup/RegisterPersonal';

import { Gender } from "../../features/accounts/signup/Gender";
import { Orientation } from "../../features/accounts/signup/Orientation";
import { Tags } from "../../features/accounts/signup/Tags";
import { Camera } from "../../features/camera/Camera";
import { Description } from "../../features/accounts/signup/Description";

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
            <div>
                <h2>Formulaire</h2>
                <Gender />
                <Orientation />
                <Tags />
            </div>
        </div>
    );
}

export function CreateFinishing(): JSX.Element {
    return (
        <div className='App login only'>
            <div>
                <h2>Finalisation</h2>
                <Camera />
                <Description />
            </div>
        </div >
    );
}