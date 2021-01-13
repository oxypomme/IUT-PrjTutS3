import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Select from "react-select";
import Creatable, { components, MenuProps } from "react-select";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendarAlt, faBuilding, faGenderless, faHelicopter, faHorse, faMarsDouble, faTransgender, faVenusDouble, faVenusMars } from "@fortawesome/free-solid-svg-icons";

import ErrorComponent from '../../../components/ErrorComponent';
import { Button, TextBox, HiddenLabel, ButtonFlex } from '../../../components/styledComponents';
import UploadFile from '../../firestorage/UploadFile';

import { getAllTags, fetchTags } from '../tagSlice';
import { getCurrProfile } from '../profileSlice';
import { addAge, addCity, addName, addGender, addPrefs, addTags, addDesc, addPhoto } from "../accountSlice";

import IProfile from '../../../include/IProfile';
import EOrientation from "../../../include/EOrientation";
import EGender from "../../../include/EGender";
import IError from "../../../include/IError";
import IComboBoxItem from '../../../include/IComboBoxItem';
import ITag from "../../../include/IComboBoxItem";
//import ErrorComponent from "../../../components/ErrorComponent";

type PropsType = {
    profile: IProfile,
}

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

const ProfileEdit = (props: PropsType): JSX.Element => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const currProfile = useSelector(getCurrProfile);
    const tags: Array<IComboBoxItem> = useSelector(getAllTags);

    // const currProfile = useSelector(getcurrProfile);
    const [name, setName] = React.useState(currProfile.name || "");
    const [age, setAge] = React.useState<number>(currProfile.age ? currProfile.age : 18);
    const [town, setTown] = React.useState(currProfile.town || "");


    // const currProfile = useSelector(getcurrProfile);
    const [selectedTags, setSelectedTags] = React.useState<Array<IComboBoxItem>>(currProfile?.tags?.length > 0 ? tags.filter(t => currProfile.tags.some(ut => t.value === ut)) : []);
    const [selectedGender, setSelectedGender] = React.useState<Array<IComboBoxItem>>(currProfile?.sex ? [{ value: currProfile.sex, label: "" }] : []);
    const [selectedOrientation, setSelectedOrientation] = React.useState<Array<IComboBoxItem>>(currProfile?.orientation ? [{ value: currProfile.orientation, label: "" }] : []);

    // const currProfile = useSelector(getcurrProfile);
    const [picture, setPicture] = React.useState<string>(currProfile.imageURL || "");
    const [description, setDescription] = React.useState<string>(currProfile.desc || "");

    const [globalErrors, setGlobalErrors] = React.useState<Array<IError>>([]);

    const genders = [
        { value: EGender.Men, label: <span><FontStyledIcon icon={faHorse} />Poney</span> },
        { value: EGender.Women, label: <span><FontStyledIcon icon={faHelicopter} />Hélicoptère</span> },
        { value: EGender.NonBinary, label: <span><FontStyledIcon icon={faGenderless} />Pirate</span> }
    ] as IComboBoxItem[]

    const orientations = [
        { value: EOrientation.Homosexual, label: <span><FontStyledIcon icon={selectedGender[0]?.value === 1 ? faVenusDouble : faMarsDouble} />Homosexuel</span> },
        { value: EOrientation.Heterosexual, label: <span><FontStyledIcon icon={faVenusMars} />Hétérosexuel</span> },
        { value: EOrientation.Bisexual, label: <span><FontStyledIcon icon={faTransgender} />Bisexuel</span> }
    ] as IComboBoxItem[]

    // Nouvelles données dans profiles.new, cad à coup de setName(...) etc.

    const handleOnChange = (event) => setName(event.target.value);

    const handleSetAgeOnChange = (event) => setAge(parseInt(event.target.value));

    const handleSetTownOnChange = (event) => setTown(event.target.value);

    const handleSetDescriptionOnChange = (event) => setDescription(event.target.value);

    React.useEffect(() => {
        dispatch(fetchTags());
    }, [dispatch]);



    const handleOnSubmit = (event) => {
        event.preventDefault();
        let errors = [];

        if (!name)
            errors = [...errors, { component: "name", label: "Veuillez spécifier votre nom." } as IError];
        if (!age)
            errors = [...errors, { component: "age", label: "Veuillez spécifier votre age." } as IError];
        else if (age && age < 18)
            errors = [...errors, { component: "age", label: "L'âge doit etre supérieur à 18 ans." } as IError];
        if (!town)
            errors = [...errors, { component: "town", label: "Veuillez spécifier votre ville." } as IError];
        if (!selectedGender || selectedGender?.length < 1)
            errors = [...errors, { component: "gender", label: "Veuillez spécifier votre genre." } as IError];
        if (!selectedOrientation || selectedOrientation?.length < 1)
            errors = [...errors, { component: "orientation", label: "Veuillez spécifier votre orientation." } as IError];
        if (!selectedTags || selectedTags?.length < 3)
            errors = [...errors, { component: "tags", label: "Veuillez séléctionner au minimum 3 tags." } as IError];
        if (!picture)
            errors = [...errors, { component: "picture", label: "Veuillez séléctionner une photo de profil." } as IError];

        if (!description)
            errors = [...errors, { component: "description", label: "Veuillez spécifier votre description." } as IError];


        setGlobalErrors(errors);
        if (errors.length < 1) {
            dispatch(addName(name));
            dispatch(addAge(age));
            dispatch(addCity(town));
            dispatch(addTags(selectedTags.map((tag) => tag.value)));
            dispatch(addGender(selectedGender[0].value));
            dispatch(addPrefs(selectedOrientation[0].value));
            dispatch(addDesc(description));
            dispatch(addPhoto(picture));
        }
    }

    const handleFile = (picture: string) => {
        setPicture(picture);
    }

    const handleBack = (event) => {
        event.preventDefault();
        history.back()
    };

    return (
        <div>
            <UploadFile defaultURL={currProfile.imageURL} onSnapExtension={handleFile} />
            <ErrorComponent array={globalErrors} name={"picture"}></ErrorComponent><TextBox borderColor={globalErrors.some(e => e.component === "name") ? 'red' : 'default'}>
                <FontAwesomeIcon icon={faUser} />
                <input
                    type='name'
                    value={name}
                    onChange={handleOnChange}
                    name='name'
                    placeholder='Prénom'
                />
                <HiddenLabel htmlFor="name">
                    Name
                </HiddenLabel>
            </TextBox>
            <ErrorComponent array={globalErrors} name={"name"}></ErrorComponent>

            <TextBox borderColor={globalErrors.some(e => e.component === "age") ? 'red' : 'default'}>
                <FontAwesomeIcon icon={faCalendarAlt} />
                <input
                    value={age}
                    onChange={handleSetAgeOnChange}
                    type='number'
                    name='age'
                    placeholder='Age'
                    min={18}
                />
                <HiddenLabel htmlFor='age'>
                    Age
                </HiddenLabel>
            </TextBox>
            <ErrorComponent array={globalErrors} name={"age"}></ErrorComponent>

            <TextBox borderColor={globalErrors.some(e => e.component === "town") ? 'red' : 'default'}>
                <FontAwesomeIcon icon={faBuilding} />
                <input
                    value={town}
                    onChange={handleSetTownOnChange}
                    type='town'
                    name='town'
                    placeholder='Ville'
                />
                <HiddenLabel htmlFor='town'>
                    Town
                </HiddenLabel>
            </TextBox>
            <ErrorComponent array={globalErrors} name={"town"}></ErrorComponent>
            <Select
                isSearchable={true}
                isClearable={true}
                onChange={mygender => setSelectedGender([mygender as IComboBoxItem])}
                defaultValue={currProfile?.sex ? { value: currProfile.sex, label: genders.filter(g => g.value === currProfile.sex)[0].label } : null}
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
                defaultValue={currProfile?.orientation ? { value: currProfile.orientation, label: orientations.filter(g => g.value === currProfile.orientation)[0].label } : null}
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
                defaultValue={currProfile?.tags?.length > 0 ? tags.filter(t => currProfile.tags.some(ut => t.value === ut)) : []}
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



            <TextBox
                borderColor={globalErrors.some(e => e.component === "description") ? 'red' : 'default'}
                width={400}
            >
                <FontAwesomeIcon icon={faUser} />
                <textarea
                    rows={5}
                    value={description}
                    onChange={handleSetDescriptionOnChange}
                    name='description'
                    placeholder='Description'
                ></textarea>
                <HiddenLabel htmlFor="description">
                    Description
                </HiddenLabel>
            </TextBox>
            <ErrorComponent array={globalErrors} name={"description"}></ErrorComponent>
            <ButtonFlex>
                <Button onClick={handleBack}>Retour</Button>
                <Button primary onClick={handleOnSubmit}>Enregistrer les modifications</Button>
            </ButtonFlex>
        </div>
    );
}

export default ProfileEdit;