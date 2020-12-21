import React from "react";

import { useDispatch } from 'react-redux';
import Select from "react-select";

import IComboBoxItem from "../../../include/IComboBoxItem";
import EGender from "../../../include/EGender";

export const Gender = (): JSX.Element => {
    const [selectedGender, setSelectedGender] = React.useState<Array<IComboBoxItem>>();

    const genders = [
        { value: EGender.Men, label: 'Poney' },
        { value: EGender.Women, label: 'Hélicoptère' },
        { value: EGender.NonBinary, label: 'Non-binaire' }
    ] as IComboBoxItem[]

    return (
        <form>
            <Select
                isSearchable={true}
                isClearable={true}
                onChange={mygender => setSelectedGender([mygender as IComboBoxItem])}
                options={genders}
            />
        </form>
    );
}