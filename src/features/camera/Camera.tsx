import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './Camera.module.css';

export function Camera(): JSX.Element {
  const dispatch = useDispatch();

  const snap = () => {
    const canvas = document.querySelector<HTMLCanvasElement>('#canvas');
    const video = document.querySelector<HTMLVideoElement>('#video');
    if (canvas != null && video != null) {
      // canvas.getContext('2d')?.drawImage(video, 0, 0, 640, 480);
      dispatch(canvas.getContext('2d')?.drawImage(video, 0, 0, 640, 480));
    }
  }

  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
      const video = document.querySelector<HTMLVideoElement>('#video');
      if (video != null) {
        video.srcObject = stream;
        video.play();
      }
    });
  }

  return (
    <div>
      <div className={styles.container}>
        <video id="video" width="640" height="480" className={styles.video}></video>
        <button id="snap" onClick={() => dispatch(snap())}>Snap Photo</button>
        <canvas id="canvas" width="640" height="480" className={styles.video}></canvas>
      </div>
    </div>
  );
}
