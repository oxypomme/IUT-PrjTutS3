import React from "react";

import { useDispatch } from 'react-redux';
import Select from "react-select";

import { IOrientation } from "../../../include/IOrientation";
import { EOrientation } from "../../../include/EOrientation";

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
