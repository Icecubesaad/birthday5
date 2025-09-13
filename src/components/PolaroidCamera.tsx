'use client';

import { useState } from 'react';
import styles from './PolaroidCamera.module.css';
import logger from '@/utils/logger';

const PolaroidCamera = () => {
  const [photos, setPhotos] = useState<{id: number, imageIndex: number}[]>([]);
  const [usedImages, setUsedImages] = useState<Set<number>>(new Set());

  // Album artwork images from songs
  const albumImages = [
    "/assets/ambarsariya.jpg",
    "/assets/behkana.jpg", 
    "/assets/khwab-dekhe.jpg",
    "/assets/party-monster.jpg",
    "/assets/passenger.jpg",
    "/assets/balam-pichkari.jpg",
    "/assets/zara-zara-touch-me.jpg",
    "/assets/character-dheela.jpg",
    "/assets/maula-mere-maula.jpg",
    "/assets/oh-girl-youre-mine.jpg",
    "/assets/something-about-you.jpg",
    "/assets/tujhe-kitna-chahne-lage-hai.jpg"
  ];

  const handleClick = () => {
    if (photos.length < 15) {
      // Get available images (not yet used)
      const availableImages = albumImages
        .map((_, index) => index)
        .filter(index => !usedImages.has(index));
      
      let selectedImageIndex: number;
      let newPhoto: { id: number; imageIndex: number };
      
      // If all images are used, reset the used images set
      if (availableImages.length === 0) {
        setUsedImages(new Set());
        selectedImageIndex = Math.floor(Math.random() * albumImages.length);
        newPhoto = { id: Date.now(), imageIndex: selectedImageIndex };
        
        setPhotos([...photos, newPhoto]);
        setUsedImages(new Set([selectedImageIndex]));

        logger.cameraReset();
        logger.cameraClicked(photos.length + 1, selectedImageIndex, albumImages[selectedImageIndex]);
      } else {
        // Pick a random image from available ones
        const randomIndex = Math.floor(Math.random() * availableImages.length);
        selectedImageIndex = availableImages[randomIndex];
        newPhoto = { id: Date.now(), imageIndex: selectedImageIndex };
        
        setPhotos([...photos, newPhoto]);
        setUsedImages(prev => new Set([...prev, selectedImageIndex]));

        logger.cameraClicked(photos.length + 1, selectedImageIndex, albumImages[selectedImageIndex]);
      }
      
      // Flash effect
      const flash = document.createElement('div');
      flash.className = styles.flash;
      document.body.appendChild(flash);
      
      setTimeout(() => {
        flash.style.opacity = '0';
        setTimeout(() => flash.remove(), 300);
      }, 50);
    }
  };

  return (
    <div className={styles.polaroidCamera} onClick={handleClick}>
      <img 
        src="/assets/camera.png" 
        alt="Polaroid Camera"
        className={styles.cameraImage}
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/assets/camera.jpg';
        }}
      />
      <div className={styles.polaroidPhotos}>
        {photos.slice().reverse().map((photo, index) => (
          <div
            key={photo.id}
            className={styles.polaroidPhoto}
            style={{
              zIndex: photos.length - index,
              animation: 'photoEject 0.5s ease-out',
              transform: `translate(${-100 - index * 20}px, ${50 + index * 10}px) rotate(${-15 + index * 5}deg)`,
            }}
          >
            <img src={albumImages[photo.imageIndex]} alt={`Memory ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolaroidCamera;
