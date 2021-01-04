import React from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import Select from "react-select";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faGenderless, faHelicopter, faHorse, faMarsDouble, faTransgender, faVenusDouble, faVenusMars } from "@fortawesome/free-solid-svg-icons";

import { fetchTags, getAllTags } from "../tagSlice";
import { addGender, addPrefs, addTags, getInfos } from "../accountSlice";

import EOrientation from "../../../include/EOrientation";
import EGender from "../../../include/EGender";
import IError from "../../../include/IError";

import IComboBoxItem from '../../../include/IComboBoxItem';
import { Button, ButtonFlex, ErrorLabel } from '../../../components/styledComponents';

const FontStyledIcon = styled(FontAwesomeIcon)`
    margin-right: 5px;
`;

export const RegisterPreferences = (): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const profile = useSelector(getInfos);
    React.useEffect(() => {
        if (!profile || profile.name === "" || profile.age < 18 || profile.town === "") {
            alert.error("Vous n'avez pas rentré tous les champs nécéssaires")
            history.push('/SignUp/1');
        }
    }, [profile])

    const tags: Array<IComboBoxItem> = useSelector(getAllTags);

    const [selectedTags, setSelectedTags] = React.useState<Array<IComboBoxItem>>([]);
    const [selectedGender, setSelectedGender] = React.useState<Array<IComboBoxItem>>([]);
    const [selectedOrientation, setSelectedOrientation] = React.useState<Array<IComboBoxItem>>([]);
    const [globalErrors, setGlobalErrors] = React.useState<Array<IError>>([]);

    const genders = [
        { value: EGender.Men, label: <span><FontStyledIcon icon={faHorse} />Poney</span> },
        { value: EGender.Women, label: <span><FontStyledIcon icon={faHelicopter} />Hélicoptère</span> },
        { value: EGender.NonBinary, label: <span><FontStyledIcon icon={faGenderless} />Pirate</span> }
    ] as IComboBoxItem[]

    const orientations = [
        { value: EOrientation.Homosexual, label: <span><FontStyledIcon icon={selectedGender[0]?.value == 1 ? faVenusDouble : faMarsDouble} />Homosexuel</span> },
        { value: EOrientation.Heterosexual, label: <span><FontStyledIcon icon={faVenusMars} />Hétérosexuel</span> },
        { value: EOrientation.Bisexual, label: <span><FontStyledIcon icon={faTransgender} />Bisexuel</span> }
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
            dispatch(addTags(selectedTags.map((tag) => tag.value)));
            dispatch(addGender(selectedGender[0].value));
            dispatch(addPrefs(selectedOrientation[0].value));
            history.push('/SignUp/3');
        }
    }

    const handleBack = (event) => {
        event.preventDefault();
        history.goBack()
    };

    return (
        <form>
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
            <ButtonFlex>
                <Button onClick={handleBack}>Retour</Button>
                <Button primary onClick={handleOnSubmit}>Suivant</Button>
            </ButtonFlex>
        </form>
    );
};
