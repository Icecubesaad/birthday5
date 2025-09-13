'use client';

import styles from './Windows.module.css';

const LetterWindow = () => {
  return (
    <div className={styles.imageOnlyContainer}>
      <img 
        src="/assets/letter-image.png" 
        alt="Special memory"
        className={styles.fullSizeImage}
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/assets/default-letter.jpg';
        }}
      />
    </div>
  );
};

export default LetterWindow;
