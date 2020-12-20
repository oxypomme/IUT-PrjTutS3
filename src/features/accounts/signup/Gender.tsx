import React from "react";

import { useDispatch } from 'react-redux';
import Select from "react-select";

const enum EGender {
    NonBinary = 0,
    Women,
    Men
}

const enum EOrientation {
    Other = 0,
    Bisexual,
    Homosexual,
    Heterosexual
}

export interface IGender { value: number, label: string; }
export interface IOrientation { value: number, label: string; }

export const Gender = (): JSX.Element => {
    const [selectedGender, setSelectedGender] = React.useState<Array<IGender>>();

    const genders = [
        { value: EGender.Men, label: 'Homme' },
        { value: EGender.Women, label: 'Femme' },
        { value: EGender.NonBinary, label: 'Non-binaire' }
    ] as IGender[]

    return (

        <form>
            <Select
                isSearchable={true}
                isClearable={true}
                onChange={mygender => setSelectedGender([mygender as IGender])}
                options={genders}
            />
        </form>
    );
}
export const Orientation = (): JSX.Element => {
    const [selectedOrientation, setSelectedOrientation] = React.useState<Array<IGender>>();

    const orientations = [
        { value: EOrientation.Homosexual, label: 'Homosexuel' },
        { value: EOrientation.Heterosexual, label: 'Hétérosexuel' },
        { value: EOrientation.Bisexual, label: 'Bisexuel' },
        { value: EOrientation.Other, label: 'Autre' }
    ] as IOrientation[]

    return (

        <form>
            <Select
                isSearchable={true}
                isClearable={true}
                onChange={myorientation => setSelectedOrientation([myorientation as IOrientation])}
                options={orientations}
            />
        </form>
    );

}
