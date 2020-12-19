import React from "react";

import { useDispatch } from 'react-redux';
import Select from "react-select";

export interface IGender { value: string, label: string; }
export interface IOrientation { value: string, label: string; }

export const Gender = (): JSX.Element => {
    const dispatch = useDispatch();

    const [selectedGender, setSelectedGender] = React.useState<Array<IGender>>();


    React.useEffect(() => {
        dispatch({
            type: 'FETCH_GENDER_REQUESTED'
        });
    }, [0]);

    const genders = [
        { value: 'men', label: 'Homme' },
        { value: 'women', label: 'Femme' },
        { value: 'non_binary', label: 'Non-binaire' }
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
    const dispatch = useDispatch();

    const [selectedOrientation, setSelectedOrientation] = React.useState<Array<IGender>>();


    React.useEffect(() => {
        dispatch({
            type: 'FETCH_ORIENTATION_REQUESTED'
        });
    }, [0]);

    const orientations = [
        { value: 'homosexuel', label: 'Homosexuel' },
        { value: 'heterosexual', label: 'Hétérosexuel' },
        { value: 'bisexual', label: 'Bisexuel' }
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
