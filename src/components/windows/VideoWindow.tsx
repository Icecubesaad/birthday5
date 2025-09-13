'use client';

import { useState, useRef } from 'react';
import styles from './Windows.module.css';

const VideoWindow = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={styles.videoPlayer}>
      <video
        ref={videoRef}
        className={styles.videoElement}
        controls
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/assets/paris.mp4" type="video/mp4" />
      </video>
      {!isPlaying && (
        <div className={styles.videoOverlay}>
          <button className={styles.bigPlayBtn} onClick={handlePlayClick}>
            ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoWindow;
