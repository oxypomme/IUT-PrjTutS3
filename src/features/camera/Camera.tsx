import React from "react";
import styles from "./Camera.module.css";
import Webcam from "react-webcam";

export function Camera(): JSX.Element {
  const webcamRef = React.useRef<Webcam>();
  const [images, setImages] = React.useState<Array<string>>([]);

  const snap = React.useCallback(() => {
    setImages([...images, webcamRef.current.getScreenshot()]);
  }, [images, setImages]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className={styles.video}
      />
      <button onClick={snap}>Snap</button>
      {images.map((image, index) => (
        <img src={image} key={index} style={{ width: 320 }} />
      ))}
    </div>
  );
}
