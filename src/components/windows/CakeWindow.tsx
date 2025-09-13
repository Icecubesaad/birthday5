'use client';

import { useState } from 'react';
import styles from './Windows.module.css';
import logger from '@/utils/logger';

const CakeWindow = () => {
  const [wish, setWish] = useState('');

  const handleWishSubmit = () => {
    if (wish.trim()) {
      logger.wishEntered(wish);
      setWish('');
      logger.wishCleared();
      alert('Your wish has been recorded! 🎂✨');
    }
  };

  return (
    <div className={styles.cakeContainer}>
      <div className={styles.textEditor}>
        <pre>{`        * Make A Wish, I Will Pray With You *

                    *                *
                         *
            *                           *
                    (             )
                    (*)           (*)           (*)
                    | |           | |           | |
                    | |           | |           | |
                 .--|_|--000000--|_|--000000--|_|--.
                ..00000| |000000| |000000| |000000| |00000..
              .00000000| |000000000000000000000000| |00000000.
             .0000000000000000000000000000000000000000000000000.
            .000000000000000000000 . 00000000000000000000000000.
            |'00000000000000000000'   '000000000000000000000000'|
            |000 000000000000000'       '00000000000000000 000;|
            |000...aaaaaaaaaa             aaaaa..aaaaaaaa..000;|
            ;;0;;..00000000.0      0.0      ;000;.;0000000;;.00;;
            ;;;;;;;;00000;00;.00  00 . 00  .00;.00;;00;000;;;;;;;
            ;;;;;;;;;;;;;;;  00    .    00  ;00;;;;;;;;;;;;;;;
            ';;;;;;;;;;;;'  00           00  ';;;;;;;;;;;;;;'
              '"""""""""'     00         00     '"""""""""'`}</pre>
      </div>
      <div className={styles.wishSection}>
        <h3>Make a Birthday Wish</h3>
        <input
          type="text"
          value={wish}
          onChange={(e) => setWish(e.target.value)}
          placeholder="Enter your wish here..."
          className={styles.wishInput}
          onKeyPress={(e) => e.key === 'Enter' && handleWishSubmit()}
        />
        <button className={styles.wishButton} onClick={handleWishSubmit}>
          Make Wish ✨
        </button>
      </div>
    </div>
  );
};

export default CakeWindow;
