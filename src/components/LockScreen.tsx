'use client';

import { useState, useEffect } from 'react';
import styles from './LockScreen.module.css';
import logger from '@/utils/logger';

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen = ({ onUnlock }: LockScreenProps) => {
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'pearl') {
      logger.systemUnlocked();
      onUnlock();
    } else {
      logger.systemLoginFailed(password.length);
      setIsError(true);
      setPassword('');
      setTimeout(() => setIsError(false), 2000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.lockScreen}>
      <div className={styles.timeContainer}>
        <div className={styles.time}>{formatTime(currentTime)}</div>
        <div className={styles.date}>{formatDate(currentTime)}</div>
      </div>

      <div className={styles.loginContainer}>
        <div className={styles.userProfile}>
          <img 
            src="/assets/user.jpg" 
            alt="Ayeeza" 
            className={styles.userImage}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/icons/september-14.png';
            }}
          />
          <h2 className={styles.userName}>Ayeeza</h2>
        </div>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.passwordContainer}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className={`${styles.passwordInput} ${isError ? styles.error : ''}`}
              autoFocus
            />
            <button type="submit" className={styles.submitButton}>
              →
            </button>
          </div>
          {isError && (
            <div className={styles.errorMessage}>
              Incorrect password. Try again.
            </div>
          )}
        </form>

        <div className={styles.hint}>
          Think of what i call you on sunday 
        </div>
      </div>
    </div>
  );
};

export default LockScreen;
