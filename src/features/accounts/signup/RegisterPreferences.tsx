import React from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import Creatable, { components, MenuProps } from "react-select";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faFemale, faGenderless, faHelicopter, faHorse, faMale, faMarsDouble, faTransgender, faVenusDouble, faVenusMars } from "@fortawesome/free-solid-svg-icons";

import { fetchTags, getAllTags } from "../tagSlice";
import { addGender, addPrefs, addTags, getInfos, getPrefsInfos } from "../accountSlice";

import EOrientation from "../../../include/EOrientation";
import EGender from "../../../include/EGender";
import IError from "../../../include/IError";
import ITag from "../../../include/IComboBoxItem";
import ErrorComponent from "../../../components/ErrorComponent";

import IComboBoxItem from '../../../include/IComboBoxItem';
import { Button, ButtonFlex, ErrorLabel } from '../../../components/styledComponents';

const FontStyledIcon = styled(FontAwesomeIcon)`
    margin-right: 5px;
`;

const MaxTagLimitAchieved = styled.div`
    margin: 15px;
`;

const Menu = (props: MenuProps<ITag, true>) => {
    const optionSelectedLength = props.getValue().length || 0;
    return (
        <components.Menu {...props}>
            {optionSelectedLength < 20 ? ( //? max amount of selectable props
                props.children
            ) : (
                    <MaxTagLimitAchieved>Limite atteinte</MaxTagLimitAchieved>
                )}
        </components.Menu>
    );
};


export const RegisterPreferences = (): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const profile = useSelector(getInfos);
    React.useEffect(() => {
        if (!profile || !profile.name || profile.age < 18 || !profile.town) {
            alert.error("Vous n'avez pas rentré tous les champs nécéssaires")
            history.push('/SignUp/1');
        }
    }, [profile])

    const tags: Array<IComboBoxItem> = useSelector(getAllTags);

    const actualInfos = useSelector(getPrefsInfos);
    const [selectedTags, setSelectedTags] = React.useState<Array<IComboBoxItem>>(actualInfos?.tags?.length > 0 ? tags.filter(t => actualInfos.tags.some(ut => t.value === ut)) : []);
    const [selectedGender, setSelectedGender] = React.useState<Array<IComboBoxItem>>(actualInfos?.sex ? [{ value: actualInfos.sex, label: "" }] : []);
    const [selectedOrientation, setSelectedOrientation] = React.useState<Array<IComboBoxItem>>(actualInfos?.orientation ? [{ value: actualInfos.orientation, label: "" }] : []);
    const [globalErrors, setGlobalErrors] = React.useState<Array<IError>>([]);

    const genders = [
        { value: EGender.Men, label: <span><FontStyledIcon icon={faMale} />Homme</span> },
        { value: EGender.Women, label: <span><FontStyledIcon icon={faFemale} />Femme</span> },
        { value: EGender.NonBinary, label: <span><FontStyledIcon icon={faGenderless} />Non-binaire</span> }
    ] as IComboBoxItem[]

    const orientations = [
        { value: EOrientation.Homosexual, label: <span><FontStyledIcon icon={selectedGender[0]?.value === EGender.Women ? faVenusDouble : faMarsDouble} />Homosexuel</span> },
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
        history.push('/SignUp/1');
    };

    return (
        <div>
            <Select
                isSearchable={true}
                isClearable={true}
                onChange={mygender => setSelectedGender([mygender as IComboBoxItem])}
                defaultValue={actualInfos?.sex ? { value: actualInfos.sex, label: genders.filter(g => g.value === actualInfos.sex)[0].label } : null}
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
            <ErrorComponent array={globalErrors} name={"gender"}></ErrorComponent>

            <Select
                isSearchable={true}
                isClearable={true}
                onChange={myorientation => setSelectedOrientation([myorientation as IComboBoxItem])}
                defaultValue={actualInfos?.orientation ? { value: actualInfos.orientation, label: orientations.filter(g => g.value === actualInfos.orientation)[0].label } : null}
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
            <ErrorComponent array={globalErrors} name={"orientation"}></ErrorComponent>

            <Creatable
                components={{ Menu }}
                borderColor="red"
                isMulti
                isSearchable={true}
                isClearable={true}
                onChange={(mytags) => setSelectedTags(mytags as IComboBoxItem[])}
                defaultValue={actualInfos?.tags?.length > 0 ? tags.filter(t => actualInfos.tags.some(ut => t.value === ut)) : []}
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
            <ErrorComponent array={globalErrors} name={"tags"}></ErrorComponent>

            <ButtonFlex>
                <Button onClick={handleBack}>Retour</Button>
                <Button primary onClick={handleOnSubmit}>Suivant</Button>
            </ButtonFlex>
        </div>
    );
};
