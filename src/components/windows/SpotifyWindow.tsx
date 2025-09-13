'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Windows.module.css';
import logger from '@/utils/logger';

interface Song {
  name: string;
  description: string;
  image: string;
  file: string;
}

const songs: Song[] = [
  {
    name: "BITTERSUITE",
    description: "reminds me the first time i talked with you for late at night",
    image: "/assets/bittersuite.jpg",
    file: "/assets/music/BITTERSUITE.mp3"
  },
  {
    name: "Maula Mere Maula",
    description: "This is what this picture gives of you",
    image: "/assets/maula-mere-maula.jpg",
    file: "/assets/music/Maula Mere Maula.mp3"
  },
  {
    name: "Behkana",
    description: "never knew i can fall in love with a song just because you said \"it reminds me of you\"",
    image: "/assets/behkana.jpg",
    file: "/assets/music/Behkana.mp3"
  },
  {
    name: "Ambarsariya",
    description: "THE WHOLE SONG IS FOR YOU",
    image: "/assets/ambarsariya.jpg",
    file: "/assets/music/Ambarsariya.mp3"
  },
  {
    name: "Balam Pichkari",
    description: "like you can actually be a character in this song",
    image: "/assets/balam-pichkari.jpg",
    file: "/assets/music/Balam Pichkari.mp3"
  },
  {
    name: "Zara Zara Touch Me",
    description: "yea i cant explain what this song and image makes me wanna do to you",
    image: "/assets/zara-zara-touch-me.jpg",
    file: "/assets/music/Zara Zara Touch Me.mp3"
  },
  {
    name: "character dheela",
    description: "MATCHES VIBE OF MY SILLY WIFE",
    image: "/assets/character-dheela.jpg",
    file: "/assets/music/Character Dheela.mp3"
  },
  {
    name: "505",
    description: "I wanna sing this for you with my guitar",
    image: "/assets/505.jpg",
    file: "/assets/music/505.mp3"
  },
  {
    name: "Khwab Dekhe Sexy Lady",
    description: "Id be lying if I say I didnt imagine you dancing on this on some wedding",
    image: "/assets/khwab-dekhe.jpg",
    file: "/assets/music/Khwab Dekhe Sexy Lady.mp3"
  },
  {
    name: "Oh Girl Youre Mine",
    description: "youre so chatpati like this song",
    image: "/assets/oh-girl-youre-mine.jpg",
    file: "/assets/music/Oh Girl Youre Mine .mp3"
  },
  {
    name: "Party Monster",
    description: "God i love you tiktoks",
    image: "/assets/party-monster.jpg",
    file: "/assets/music/Party Monster.mp3"
  },
  {
    name: "Passenger",
    description: "something id listen to while doing those freaky things we discussed",
    image: "/assets/passenger.jpg",
    file: "/assets/music/Passenger.mp3"
  },
  {
    name: "Reflections",
    description: "This song reminds me of us",
    image: "/assets/reflections.jpg",
    file: "/assets/music/Reflections.mp3"
  },
  {
    name: "Something About You",
    description: "you as a whole appears in front of me when this plays",
    image: "/assets/something-about-you.jpg",
    file: "/assets/music/something.mp3"
  },
  {
    name: "Tujhe Kitna Chahne Lage",
    description: "IDK IT JUST HOW I THINK ABOUT YOU",
    image: "/assets/tujhe-kitna-chahne-lage-hai.jpg",
    file: "/assets/music/Tujhe Kitna Chahne Lage From Kabir Singh.mp3"
  }
];

const SpotifyWindow = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => nextSong();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSongIndex]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        logger.musicPaused(currentSong.name);
      } else {
        audioRef.current.play();
        logger.musicPlayed(currentSong.name, currentSong.description, currentSong.image);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    const nextSong = songs[nextIndex];
    setCurrentSongIndex(nextIndex);
    setIsPlaying(false);
    logger.musicPlayed(nextSong.name, nextSong.description, nextSong.image);
  };

  const prevSong = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    const prevSong = songs[prevIndex];
    setCurrentSongIndex(prevIndex);
    setIsPlaying(false);
    logger.musicPlayed(prevSong.name, prevSong.description, prevSong.image);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = (parseFloat(e.target.value) / 100) * duration;
      const oldTime = currentTime;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
      logger.musicSeeked(currentSong.name, oldTime, newTime);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.spotifyPlayer}>
      <div className={styles.albumArt}>
        <img 
          src={currentSong.image} 
          alt={currentSong.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/music/default.jpg';
          }}
        />
      </div>
      
      <div className={styles.songInfo}>
        <h3 className={styles.songTitle}>{currentSong.name}</h3>
        <p className={styles.songDescription}>{currentSong.description}</p>
      </div>

      <div className={styles.controls}>
        <button className={styles.controlBtn} onClick={prevSong}>
          ⏮
        </button>
        <button className={styles.playBtn} onClick={togglePlay}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className={styles.controlBtn} onClick={nextSong}>
          ⏭
        </button>
      </div>

      <div className={styles.progressSection}>
        <span className={styles.timeLabel}>{formatTime(currentTime)}</span>
        <input
          type="range"
          className={styles.progressSlider}
          min="0"
          max="100"
          value={duration ? (currentTime / duration) * 100 : 0}
          onChange={handleSeek}
        />
        <span className={styles.timeLabel}>{formatTime(duration || 0)}</span>
      </div>

      <div className={styles.playlist}>
        <h4>Playlist</h4>
        {songs.map((song, index) => (
          <div
            key={index}
            className={`${styles.playlistItem} ${index === currentSongIndex ? styles.active : ''}`}
            onClick={() => {
              setCurrentSongIndex(index);
              setIsPlaying(false);
            }}
          >
            <img src={song.image} alt={song.name} />
            <span>{song.name}</span>
          </div>
        ))}
      </div>

      <audio
        ref={audioRef}
        src={currentSong.file}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default SpotifyWindow;
