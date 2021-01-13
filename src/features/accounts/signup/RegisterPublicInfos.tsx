import React from "react";
import Webcam from "react-webcam";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import { Button, ButtonFlex, ErrorLabel, HiddenLabel, TextBox } from "../../../components/styledComponents";
import { ProfilePicture } from "../profile/ProfileComponent";
import { addDesc, addPhoto, getInfos, getPublicInfos } from "../accountSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faUser } from "@fortawesome/free-solid-svg-icons";
import IError from "../../../include/IError";
import UploadFile from "../../firestorage/UploadFile";

export interface ICam { value: string, label: string; }
import ErrorComponent from "../../../components/ErrorComponent";

export function RegisterPublicInfos(): JSX.Element {
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const profile = useSelector(getInfos);
    React.useEffect(() => {
        if (!profile || profile.sex < 0 || profile.orientation < 0 || profile.tags.lenght < 3) {
            alert.error("Vous n'avez pas rentré tous les champs nécéssaires")
            history.push('/SignUp/2');
        }
    }, [profile])

    const actualInfos = useSelector(getPublicInfos);
    const [picture, setPicture] = React.useState<string>(actualInfos.imageURL || "");
    const [description, setDescription] = React.useState<string>(actualInfos.desc || "");
    const [globalErrors, setGlobalErrors] = React.useState<Array<IError>>([]);

    const handleSetDescriptionOnChange = (event) => setDescription(event.target.value);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        let errors = [];

        if (!picture)
            errors = [...errors, { component: "picture", label: "Veuillez séléctionner une photo de profil." } as IError];

        if (!description)
            errors = [...errors, { component: "description", label: "Veuillez spécifier votre description." } as IError];

        setGlobalErrors(errors);
        if (errors.length < 1) {
            dispatch(addDesc(description));
            dispatch(addPhoto(picture));
            history.push('/SignUp/4');
        }
    };

    const handleFile = (picture: string) => {
        setPicture(picture);
    }

    const handleBack = (event) => {
        event.preventDefault();
        history.goBack()
    };

    return (
        <div>
            <UploadFile defaultURL={actualInfos.imageURL} onSnapExtension={handleFile} />
            <ErrorComponent array={globalErrors} name={"picture"}></ErrorComponent>

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
                <Button primary onClick={handleOnSubmit}>Suivant</Button>
            </ButtonFlex>
        </div>
    );
}

