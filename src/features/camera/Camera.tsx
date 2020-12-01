import React from 'react';
// import { useDispatch } from 'react-redux';
import styles from './Camera.module.css';

export function Camera(): JSX.Element {
  // const dispatch = useDispatch();
  const snap = () => {
    const canvas = document.querySelector<HTMLCanvasElement>('#canvas');
    const video = document.querySelector<HTMLVideoElement>('#video');
    const images = document.querySelector<HTMLVideoElement>('#images');
    if (canvas != null && video != null && images != null) {
      canvas.getContext('2d')?.drawImage(video, 0, 0, 640, 480);
      images.insertAdjacentHTML('beforeend', '<img src=' + canvas.toDataURL() + ' style="width: 320px; height: 240px;"></img>');
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
        <button id="snap" onClick={() => snap()}>Snap Photo</button>
        <canvas id="canvas" width="640" height="480" className={styles.canvas}></canvas>
        <div id="images">
        </div>
      </div>
    </div>
  );
}
