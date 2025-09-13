'use client';

import { useState } from 'react';
import styles from './Windows.module.css';

const GiftWindow = () => {
  const [inputValue, setInputValue] = useState('');
  const [showResponse, setShowResponse] = useState(false);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      setShowResponse(true);
      setTimeout(() => {
        setInputValue('');
        setShowResponse(false);
      }, 3000);
    }
  };

  return (
    <div className={styles.giftContainer}>
      <h2>💝 A Special Question Just For You 💝</h2>
      <p className={styles.giftMessage}>
        If you could relive one perfect moment we've shared together, which would it be?
      </p>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Tell me about that magical moment..."
        className={styles.giftInput}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <button className={styles.submitBtn} onClick={handleSubmit}>
        Share Your Memory ✨
      </button>
      {showResponse && (
        <div className={styles.responseMessage}>
          That memory is now treasured forever in my heart. Thank you for being the most wonderful part of my life. 💕
        </div>
      )}
    </div>
  );
};

export default GiftWindow;
