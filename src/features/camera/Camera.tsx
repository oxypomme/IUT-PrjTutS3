import React from "react";
import styles from "./Camera.module.css";
import Webcam from "react-webcam";
import Select from "react-select";

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

  return (
    <div>
      <Select
        onChange={device => setCam(device.value)}
        options={devices}
      />

      <Webcam
        audio={false}
        ref={webcamRef}
        videoConstraints={{ deviceId: cam }} //? apparently default is UserMedia
        screenshotFormat="image/jpeg"
        className={styles.video}
      />
      <button onClick={snap} style={{ display: 'block' }}>Snap</button>
      {images.map((image, index) => (
        <img src={image} key={index} style={{ width: 320, border: '1px dashed magenta' }} />
      ))}
    </div>
  );
}
