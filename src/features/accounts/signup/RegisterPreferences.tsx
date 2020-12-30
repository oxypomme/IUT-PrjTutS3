import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags, getAllTags } from "../tagSlice";
import { useHistory } from "react-router-dom";
import { Button, Spacer } from '../../../components/styledComponents';
import { addPrefs, addTag } from "../accountSlice";

import IComboBoxItem from '../../../include/IComboBoxItem';
import Select from "react-select";
import EOrientation from "../../../include/EOrientation";
import EGender from "../../../include/EGender";

export const RegisterPreferences = (): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();
    const tags: Array<IComboBoxItem> = useSelector(getAllTags);

    const [selectedTags, setSelectedTags] = React.useState<Array<IComboBoxItem>>();
    const [selectedGender, setSelectedGender] = React.useState<Array<IComboBoxItem>>();
    const [selectedOrientation, setSelectedOrientation] = React.useState<Array<IComboBoxItem>>();

    const genders = [
        { value: EGender.Men, label: 'Poney' },
        { value: EGender.Women, label: 'Hélicoptère' },
        { value: EGender.NonBinary, label: 'Non-binaire' }
    ] as IComboBoxItem[]

    const orientations = [
        { value: EOrientation.Homosexual, label: 'Homosexuel' },
        { value: EOrientation.Heterosexual, label: 'Hétérosexuel' },
        { value: EOrientation.Bisexual, label: 'Bisexuel' }
    ] as IComboBoxItem[]

    React.useEffect(() => {
        dispatch(fetchTags());
    }, [dispatch]);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const canSubmit = selectedTags?.length >= 3 && selectedGender?.length > 0 && selectedOrientation?.length > 0; // minimum of 3 selected tags
        if (canSubmit) {
            dispatch(addTag(selectedTags.map((tag) => tag.value)))
            // dispatch(addGender(selectedGender[0].value)); // todo addGender
            dispatch(addPrefs(selectedOrientation[0].value));
            history.push('/SignUp/3');
        }
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <Select
                isSearchable={true}
                isClearable={true}
                onChange={myorientation => setSelectedOrientation([myorientation as IComboBoxItem])}
                options={orientations}
                placeholder="Sélectionnez votre orientation"
            />
            <Select
                isSearchable={true}
                isClearable={true}
                onChange={mygender => setSelectedGender([mygender as IComboBoxItem])}
                options={genders}
                placeholder="Sélectionnez votre genre"
            />
            <Select
                isMulti
                isSearchable={true}
                isClearable={true}
                onChange={(mytags) => setSelectedTags(mytags as IComboBoxItem[])}
                options={tags}
                placeholder="Sélectionnez vos tags"
                closeMenuOnSelect={false}
            />
            <Button>Suivant</Button>
        </form>
    );
};
