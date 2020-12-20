import React from "react";

import { useDispatch } from 'react-redux';
import Select from "react-select";

const enum EGender {
    NonBinary = 0,
    Women,
    Men
}

export interface IGender { value: number, label: string; }

export const Gender = (): JSX.Element => {
    const [selectedGender, setSelectedGender] = React.useState<Array<IGender>>();

    const genders = [
        { value: EGender.Men, label: 'Poney' },
        { value: EGender.Women, label: 'Hélicoptère' },
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