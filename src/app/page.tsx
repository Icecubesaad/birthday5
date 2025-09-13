'use client';

import { useState, useEffect } from 'react';
import Desktop from '@/components/Desktop';
import LockScreen from '@/components/LockScreen';
import styles from './page.module.css';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.container}>
      {!isUnlocked ? (
        <LockScreen onUnlock={handleUnlock} />
      ) : (
        <Desktop />
      )}
    </div>
  );
}
