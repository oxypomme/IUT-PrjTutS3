import React from "react";

import { useDispatch } from 'react-redux';
import Select from "react-select";

const enum EOrientation {
    Other = 0,
    Bisexual,
    Homosexual,
    Heterosexual
}

export interface IOrientation { value: number, label: string; }

export const Orientation = (): JSX.Element => {
    const [selectedOrientation, setSelectedOrientation] = React.useState<Array<IOrientation>>();

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