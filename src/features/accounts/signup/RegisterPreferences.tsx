import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags, getAllTags } from "../tagSlice";
import { useHistory } from "react-router-dom";
import { Button, ErrorLabel, Spacer } from '../../../components/styledComponents';
import { addGender, addPrefs, addTag, getInfos } from "../accountSlice";

import IComboBoxItem from '../../../include/IComboBoxItem';
import Select from "react-select";
import EOrientation from "../../../include/EOrientation";
import EGender from "../../../include/EGender";
import IError from "../../../include/IError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faGenderless, faHelicopter, faHorse, faMarsDouble, faTransgender, faVenusMars } from "@fortawesome/free-solid-svg-icons";

export const RegisterPreferences = (): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();

    const profile = useSelector(getInfos);
    React.useEffect(() => {
        if (!profile || profile.name === "" || profile.age < 18 || profile.town === "") {
            alert("Vous n'avez pas rentré tous les champs nécéssaires.")
            history.push('/SignUp/1');
        }
    }, [profile])

    const tags: Array<IComboBoxItem> = useSelector(getAllTags);

    const [selectedTags, setSelectedTags] = React.useState<Array<IComboBoxItem>>();
    const [selectedGender, setSelectedGender] = React.useState<Array<IComboBoxItem>>();
    const [selectedOrientation, setSelectedOrientation] = React.useState<Array<IComboBoxItem>>();
    const [globalErrors, setGlobalErrors] = React.useState<Array<IError>>([]);

    const genders = [
        { value: EGender.Men, label: <span><FontAwesomeIcon icon={faHorse} style={{ marginRight: 4 }} />Poney</span> },
        { value: EGender.Women, label: <span><FontAwesomeIcon icon={faHelicopter} style={{ marginRight: 4 }} />Hélicoptère</span> },
        { value: EGender.NonBinary, label: <span><FontAwesomeIcon icon={faGenderless} style={{ marginRight: 4 }} />Pirate</span> }
    ] as IComboBoxItem[]

    const orientations = [
        { value: EOrientation.Homosexual, label: <span><FontAwesomeIcon icon={faVenusMars} style={{ marginRight: 4 }} />Homosexuel</span> },
        { value: EOrientation.Heterosexual, label: <span><FontAwesomeIcon icon={faMarsDouble} style={{ marginRight: 4 }} />Hétérosexuel</span> },
        { value: EOrientation.Bisexual, label: <span><FontAwesomeIcon icon={faTransgender} style={{ marginRight: 4 }} />Bisexuel</span> }
    ] as IComboBoxItem[]

    React.useEffect(() => {
        dispatch(fetchTags());
    }, [dispatch]);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        let errors = [];

        if (!selectedGender || selectedGender?.length < 1)
            errors = [...errors, { component: "gender", label: "Veuillez spécifier votre genre." } as IError];
        if (!selectedOrientation || selectedOrientation?.length < 1)
            errors = [...errors, { component: "orientation", label: "Veuillez spécifier votre orientation." } as IError];
        if (!selectedTags || selectedTags?.length < 3)
            errors = [...errors, { component: "tags", label: "Veuillez séléctionner au minimum 3 tags." } as IError];


        setGlobalErrors(errors);
        if (errors.length < 1) {
            dispatch(addTag(selectedTags.map((tag) => tag.value)));
            dispatch(addGender(selectedGender[0].value));
            dispatch(addPrefs(selectedOrientation[0].value));
            history.push('/SignUp/3');
        }
    }

    return (
        <form onSubmit={handleOnSubmit}>
            {globalErrors.length > 0 &&
                <ErrorLabel>
                    {globalErrors.map((error, index) => (
                        <div key={index}>
                            <FontAwesomeIcon icon={faExclamationTriangle} />
                            {error.label}
                        </div>
                    ))}
                </ErrorLabel>
            }
            <Select
                isSearchable={true}
                isClearable={true}
                onChange={mygender => setSelectedGender([mygender as IComboBoxItem])}
                options={genders}
                placeholder="Sélectionnez votre genre"
                styles={{
                    container: base => ({
                        ...base,
                        backgroundColor: globalErrors.some(e => e.component === "gender") ? 'red' : 'default',
                        borderRadius: '5px',
                        padding: 2,
                        marginBottom: '2px',
                    }),
                }}
            />
            <Select
                isSearchable={true}
                isClearable={true}
                onChange={myorientation => setSelectedOrientation([myorientation as IComboBoxItem])}
                options={orientations}
                placeholder="Sélectionnez votre orientation"
                styles={{
                    container: base => ({
                        ...base,
                        backgroundColor: globalErrors.some(e => e.component === "orientation") ? 'red' : 'default',
                        borderRadius: '5px',
                        padding: 2,
                        marginBottom: '2px',
                    }),
                }}
            />
            <Select
                borderColor="red"
                isMulti
                isSearchable={true}
                isClearable={true}
                onChange={(mytags) => setSelectedTags(mytags as IComboBoxItem[])}
                options={tags}
                placeholder="Sélectionnez vos tags"
                closeMenuOnSelect={false}
                styles={{
                    container: base => ({
                        ...base,
                        backgroundColor: globalErrors.some(e => e.component === "tags") ? 'red' : 'default',
                        borderRadius: '5px',
                        padding: 2,
                    }),
                }}
            />
            <Button primary>Suivant</Button>
        </form>
    );
};
