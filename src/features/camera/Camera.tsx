import React from "react";
// import { useDispatch } from 'react-redux';
import styles from "./Camera.module.css";

export function Camera({ test = 12 }): JSX.Element {
  const video = React.useRef<HTMLVideoElement>();
  const canvas = React.useRef<HTMLCanvasElement>();

  const [images, setImages] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    const initStream = async () => {
      const stream = await navigator?.mediaDevices?.getUserMedia({
        video: true,
      });
      if (stream && video) {
        video.current.srcObject = stream;
        video.current.play();
      }
    };
    initStream();
  }, []);

  // const dispatch = useDispatch();
  const snap = () => {
    canvas.current.getContext("2d")?.drawImage(video.current, 0, 0, 640, 480);
    setImages([...images, canvas.current.toDataURL()]);
  };

  return (
    <div>
      <div className={styles.container}>
        <video
          ref={video}
          width='640'
          height='480'
          className={styles.video}
        ></video>
        <button id='snap' onClick={snap}>
          Snap Photo
        </button>
        <canvas
          id='canvas'
          ref={canvas}
          width='640'
          height='480'
          className={styles.canvas}
        ></canvas>
        {images.map((image, index) => (
          <img src={image} key={index} style={{ width: 320, height: 240 }} />
        ))}
      </div>
    </div>
  );
}
