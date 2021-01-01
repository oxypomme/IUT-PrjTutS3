import React from "react";
import Webcam from "react-webcam";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getUploadedFiles, uploadFile, uploadFileSuccess, uploadStringFile } from "../../firestorage/storageSlice";
import { Button, ErrorLabel, HiddenLabel, TextBox } from "../../../components/styledComponents";
import { ProfilePicture } from "../profile/ProfileComponent";
import { addDesc, addPhoto, getInfos } from "../accountSlice";
import { isNonNullChain } from "typescript";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faUser } from "@fortawesome/free-solid-svg-icons";
import IError from "../../../include/IError";

export interface ICam { value: string, label: string; }

export function RegisterPublicInfos(): JSX.Element {
    const dispatch = useDispatch();
    const history = useHistory();

    const profile = useSelector(getInfos);
    React.useEffect(() => {
        if (!profile || profile.sex < 0 || profile.orientation < 0 || profile.tags.lenght < 3) {
            alert("Vous n'avez pas rentré tous les champs nécéssaires.")
            history.push('/SignUp/2');
        }
    }, [profile])

    const webcamRef = React.useRef<Webcam>();
    const [devices, setDevices] = React.useState<Array<ICam>>([]);
    const [cam, setCam] = React.useState<string>();
    const [picture, setPicture] = React.useState<string>();

    const [description, setDescription] = React.useState();
    const [globalErrors, setGlobalErrors] = React.useState<Array<IError>>([]);


    const [pendingUploadUrl, setPendingUploadUrl] = React.useState<string>();


    const uploadedLinks = useSelector(getUploadedFiles);
    let mylink;
    if ((mylink = uploadedLinks.find(u => u.url === pendingUploadUrl)) !== undefined) {
        setPendingUploadUrl(undefined);
        console.log(mylink, mylink.dlUrl);
    }

    React.useEffect(() => {
        const getDevices = async () => {
            let mdevices = await navigator.mediaDevices.enumerateDevices();
            mdevices = mdevices.filter(({ kind }) => kind === "videoinput");
            const icams = mdevices.map(v => { return { value: v.deviceId, label: v.label }; }) as ICam[];

            setDevices(icams);
        }
        getDevices();
    }, [setDevices]);

    const snap = React.useCallback(() => {
        const imageUrl = webcamRef.current.getScreenshot();
        setPicture(imageUrl);
        // dispatch(uploadStringFile("profiles/2", imageUrl));
    }, [picture, setPicture]);

    const uploadLocalFile = React.useCallback((event) => {
        const file = event.target.files[0];
        if (file == undefined || !file.name.match(/.(jpg|jpeg|png|jfif|pjpeg|.pjp)$/i))
            return;
        setPendingUploadUrl("profiles/1");
        // dispatch(uploadFile("profiles/1", file));

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
            errors = [...errors, { component: "picture", label: "Veuillez séléctionner une photo de profile." } as IError];

        if (!description || (description && description === isNonNullChain))
            errors = [...errors, { component: "description", label: "Veuillez spécifier votre description." } as IError];

        setGlobalErrors(errors);
        if (errors.length < 1) {
            dispatch(addDesc(description));
            dispatch(addPhoto("https://i.ytimg.com/vi/BHc4sA3k8pA/maxresdefault.jpg")); //TODO fix to the link of the image
            history.push('/SignUp/4');
        }
    };

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
            <Button onClick={snap}>Prendre une photo</Button>
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
            <Button primary>Suivant</Button>
        </form>
    );
}

