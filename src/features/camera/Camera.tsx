import React from "react";
import styles from "./Camera.module.css";
import Webcam from "react-webcam";
import Select from "react-select";
import { Mic } from '../mic/Mic';

export interface ICam { value: string, label: string; }
export function Camera(): JSX.Element {
  const webcamRef = React.useRef<Webcam>();
  const [devices, setDevices] = React.useState<Array<ICam>>([]);
  const [cam, setCam] = React.useState<string>();
  const [images, setImages] = React.useState<Array<string>>([]);

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
    setImages([...images, webcamRef.current.getScreenshot()]);
  }, [images, setImages]);

  const uploadFile = React.useCallback((event) => {
    const file = event.target.files[0];
    if (file == undefined || !file.name.match(/.(jpg|jpeg|png|gif|jfif|pjpeg|.pjp)$/i))
      return;
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
        className={styles.video}
      />
      <button onClick={snap}>Snap</button>
      <input type="file" onChange={uploadFile} accept="image/png, image/jpeg, image/gif" style={{ display: 'block' }} />
      {images.map((image, index) => (
        <img src={image} key={index} style={{ width: 320, border: '1px dashed magenta' }} />
      ))}
      <Mic />
    </div>
  );
}
