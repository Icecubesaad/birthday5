'use client';

import styles from './Windows.module.css';

const PhotosWindow = () => {
  const photos: number[] = []; // Empty array to show the message

  return (
    <div className={styles.photoGallery}>
      {photos.length === 0 ? (
        <div className={styles.emptyPhotos}>
          <h3>📸 Our Future Memories</h3>
          <p>we will fill this when we go on our date</p>
        </div>
      ) : (
        <div className={styles.photoGrid}>
          {photos.map((num) => (
            <img
              key={num}
              src={`/assets/photos/photo${num}.jpg`}
              alt={`Memory ${num}`}
              className={styles.galleryPhoto}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotosWindow;
