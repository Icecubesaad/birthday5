'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './MusicPlayer.module.css';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      // Auto-play on mount
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isVisible) return null;

  return (
    <div className={styles.musicWidget}>
      <div className={styles.widgetHeader}>
        <span>Nothing Better FM</span>
        <button className={styles.widgetClose} onClick={() => setIsVisible(false)}>
          ×
        </button>
      </div>
      <div className={styles.widgetContent}>
        <div className={styles.trackInfo}>
          <div className={styles.trackTitle}>
            Channel: How lucky we are to celebrate another birthday together?
          </div>
          <div className={styles.trackTime}>
            {formatTime(currentTime)} / {formatTime(duration || 0)}
          </div>
          <div className={styles.trackArtist}>
            Happy Birthday<br />Morality
          </div>
        </div>
        <div className={styles.playerControls}>
          <button className={styles.controlBtn}>⏮</button>
          <button className={styles.controlBtn} onClick={togglePlay}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button className={styles.controlBtn}>⏭</button>
          <input
            type="range"
            className={styles.volumeSlider}
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
          />
          <span className={styles.volumeIcon}>🔊</span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
          />
        </div>
      </div>
      <audio ref={audioRef} autoPlay loop>
        <source src="/assets/music.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default MusicPlayer;
