import React from "react";
import Webcam from "react-webcam";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import { getUploadedFiles } from "../../firestorage/storageSlice";

import { Button, ButtonFlex, ErrorLabel, HiddenLabel, TextBox } from "../../../components/styledComponents";
import { ProfilePicture } from "../profile/ProfileComponent";
import { addDesc, addPhoto, getInfos, getPublicInfos } from "../accountSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faUser } from "@fortawesome/free-solid-svg-icons";
import IError from "../../../include/IError";

export interface ICam { value: string, label: string; }

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

    const webcamRef = React.useRef<Webcam>();
    const [devices, setDevices] = React.useState<Array<ICam>>([]);
    const [cam, setCam] = React.useState<string>("");

    const actualInfos = useSelector(getPublicInfos);
    const [picture, setPicture] = React.useState<string>(actualInfos.imageURL);
    const [description, setDescription] = React.useState<string>(actualInfos.desc);
    const [globalErrors, setGlobalErrors] = React.useState<Array<IError>>([]);


    React.useEffect(() => {
        const getDevices = async () => {
            let mdevices = await navigator.mediaDevices.enumerateDevices();
            mdevices = mdevices.filter(({ kind }) => kind === "videoinput");
            const icams = mdevices.map(v => { return { value: v.deviceId, label: v.label }; }) as ICam[];

            setDevices(icams);
            setCam(icams[0].label);
        }
        getDevices();
    }, [setDevices]);

    const handleSnap = (event) => {
        event.preventDefault();
        const imageUrl = webcamRef.current.getScreenshot();
        setPicture(imageUrl);
    }

    const uploadLocalFile = React.useCallback((event) => {
        const file = event.target.files[0];
        if (file == undefined || !file.name.match(/.(jpg|jpeg|png|jfif|pjpeg|.pjp)$/i))
            return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setPicture(e.target.result as string);
        }
    }, [picture, setPicture]);


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
                onChange={device => setCam(device.value)}
                options={devices}
                placeholder="Sélectionnez une autre caméra"
            />

            <Webcam
                audio={false}
                ref={webcamRef}
                videoConstraints={{ deviceId: cam }} //? apparently default is UserMedia
                screenshotFormat="image/jpeg"
                style={{ display: "block", border: "2px solid black", width: 720 }}
            />
            <Button onClick={handleSnap}>Prendre une photo</Button>
            <input type="file" onChange={uploadLocalFile} accept="image/png, image/jpeg" style={{ display: 'block' }} />
            {picture &&
                <div style={{ width: 320, height: 480 }}>
                    <ProfilePicture source={picture} />
                </div>
            }
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
            <ButtonFlex>
                <Button onClick={handleBack}>Retour</Button>
                <Button primary onClick={handleOnSubmit}>Suivant</Button>
            </ButtonFlex>
        </form>
    );
}

