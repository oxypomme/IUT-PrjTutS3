import React from "react";

import { useDispatch } from 'react-redux';
import Select from "react-select";

import IComboBoxItem from "../../../include/IComboBoxItem";
import EOrientation from "../../../include/EOrientation";

export const Orientation = (): JSX.Element => {
    const [selectedOrientation, setSelectedOrientation] = React.useState<Array<IComboBoxItem>>();

    const orientations = [
        { value: EOrientation.Homosexual, label: 'Homosexuel' },
        { value: EOrientation.Heterosexual, label: 'Hétérosexuel' },
        { value: EOrientation.Bisexual, label: 'Bisexuel' }
    ] as IComboBoxItem[]

    return (
        <form>
            <Select
                isSearchable={true}
                isClearable={true}
                onChange={myorientation => setSelectedOrientation([myorientation as IComboBoxItem])}
                options={orientations}
            />
        </form>
    );

}
