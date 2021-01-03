import React from "react";
import Webcam from "react-webcam";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import { getUploadedFiles, uploadFile, uploadFileSuccess, uploadStringFile } from "../firestorage/storageSlice";

import { Mic } from '../mic/Mic';

export interface ICam { value: string, label: string; }
export function Camera(): JSX.Element {
    const dispatch = useDispatch();

    const webcamRef = React.useRef<Webcam>();
    const [devices, setDevices] = React.useState<Array<ICam>>([]);
    const [cam, setCam] = React.useState<string>();
    const [images, setImages] = React.useState<Array<string>>([]);

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
        setImages([...images, imageUrl]);
        // console.log(images);
        // dispatch(uploadStringFile("profiles/2", imageUrl));
    }, [images, setImages]);

    const uploadLocalFile = React.useCallback((event) => {
        const file = event.target.files[0];
        if (file == undefined || !file.name.match(/.(jpg|jpeg|png|jfif|pjpeg|.pjp)$/i))
            return;
        setPendingUploadUrl("profiles/1");
        // dispatch(uploadFile("profiles/1", file));

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setImages([...images, e.target.result as string]);
        }
    }, [images, setImages]);

    return (
        <div>
            <div style={{ width: 320, padding: '8px' }}>
                <Select
                    onChange={device => setCam(device.value)}
                    options={devices}
                />
            </div>

            <Webcam
                audio={false}
                ref={webcamRef}
                videoConstraints={{ deviceId: cam }} //? apparently default is UserMedia
                screenshotFormat="image/jpeg"
                style={{ display: "block", border: "2px solid black", width: 720 }}
            />
            <button onClick={snap}>Snap</button>
            <input type="file" onChange={uploadLocalFile} accept="image/png, image/jpeg" style={{ display: 'block' }} />
            {images.map((image, index) => (
                <img src={image} key={index} style={{ width: 320, border: '1px dashed magenta' }} />
            ))}
            <Mic />
        </div>
    );
}

