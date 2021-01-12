import React from 'react';
import styled from '@emotion/styled';
import Webcam from "react-webcam";
import Select from 'react-select';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faUpload } from '@fortawesome/free-solid-svg-icons';

import { Button, ButtonFlex } from '../../components/styledComponents';
import FileInput from './FileInput';
import { ProfilePicture } from '../accounts/profile/ProfileComponent';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    padding: 5px;
    overflow: hidden;

    background: var(--background2);
    border-radius: 10px;

    & > * {
        margin: auto;
    }
`;

const ImageContainer = styled.div`
    display: flex;
    height: 450px;
    margin: 5px;

    & > * {
        padding: 10px;
    }

    & > :first-of-type {
        border-right: 1px solid silver;
    }

    & video,
    & img {
        margin-top: 4px;
    }

    & button {
        display: block;
        margin: 0 auto;
        width: 95%;
    }
`;

const CameraContainer = styled.div`
    width: 640px;

    & > video {
        display: "block";
        border: "2px solid black";
        width: 640px;
        height: 360px;
    }
`;

const UploadContainer = styled.div`
    width: 640px;

    & > img {
        height: 360px;
    }
`;

const StyledFileInput = styled.div`
    width: 95%;
    margin: 0 auto;
`;

const Title = styled.h3`
    margin: 0;
    padding: 6px 0;
    height: 26px;
    text-align: left;
`;

const SVGContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 360px;
    margin: 4px 0;
    & svg {
        display: block;
        margin: 0 auto;
    }
`;

const StyledButtonFlex = styled(ButtonFlex)`
    & > * {
        width: 220px;
    }
`;

type PropsType = {
    defaultURL?: string;
    onCancel?: (event: React.SyntheticEvent) => void;
    onOk?: (event: React.SyntheticEvent, picture: string) => void;
    onSnapExtension?: (picture: string) => void;
}

interface ICam { value: string, label: string; }

const UploadFile = ({ defaultURL, onCancel, onOk, onSnapExtension }: PropsType) => {
    const [picture, setPicture] = React.useState<string>(defaultURL ? defaultURL : "");
    const [devices, setDevices] = React.useState<Array<ICam>>([]);
    const [cam, setCam] = React.useState<string>(null);
    const [camAvailable, setCamAvailable] = React.useState(false);

    const webcamRef = React.useRef<Webcam>(null);

    React.useEffect(() => {
        (async () => {
            let mdevices = await navigator.mediaDevices.enumerateDevices();
            mdevices = mdevices.filter(({ kind }) => kind === "videoinput");
            const icams = mdevices.map(v => { return { value: v.deviceId, label: v.label }; }) as ICam[];

            setDevices(icams);
        })()
    }, []);

    const handleCamChange = (device: ICam) => {
        setCam(device.value);
        setCamAvailable(true);
    }

    const onNOk = (event: React.SyntheticEvent) => {
        setPicture("");
        onCancel(event);
    }

    const uploadLocalFile = React.useCallback((event) => {
        const file = event.target.files[0];
        if (file == undefined || !file.name.match(/.(jpg|jpeg|png|jfif|pjpeg|.pjp)$/i))
            return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setPicture(e.target.result as string);
            if (onSnapExtension) {
                onSnapExtension(e.target.result as string);
            }
        }
    }, [picture]);

    const handleSnap = (event) => {
        event.preventDefault();
        if (cam) {
            const imageUrl = webcamRef.current.getScreenshot();
            setPicture(imageUrl);
            if (onSnapExtension) {
                onSnapExtension(imageUrl);
            }
        }
    }

    return (
        <Container>
            <ImageContainer>
                <CameraContainer>
                    <Select
                        onChange={handleCamChange}
                        options={devices}
                        placeholder="Sélectionnez une autre caméra"
                    />

                    {cam ? <Webcam
                        audio={false}
                        ref={webcamRef}
                        videoConstraints={{ deviceId: cam }}
                        screenshotFormat="image/jpeg"
                    /> : <SVGContainer><FontAwesomeIcon icon={faCamera} size="5x" color="var(--background1)" /></SVGContainer>}
                    <Button onClick={handleSnap} disabled={!camAvailable}>Prendre une photo</Button>
                </CameraContainer>
                <UploadContainer>
                    <Title>Photo actuelle :</Title>
                    {picture ?
                        <ProfilePicture source={picture} />
                        : <SVGContainer><FontAwesomeIcon icon={faUpload} size="5x" color="var(--background1)" /></SVGContainer>
                    }
                    <StyledFileInput>
                        <FileInput onChange={uploadLocalFile} />
                    </StyledFileInput>
                </UploadContainer>
            </ImageContainer>
            <StyledButtonFlex>
                {onCancel ? <Button onClick={onNOk}>Annuler</Button> : <></>}
                {onOk ? <Button primary onClick={event => onOk(event, picture)}>Envoyer</Button> : <></>}
            </StyledButtonFlex>
        </Container>
    );
}

export default UploadFile;