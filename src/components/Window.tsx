'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Window.module.css';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  position: { x: number; y: number };
  zIndex: number;
  onClose: () => void;
  onFocus: () => void;
  onPositionChange: (position: { x: number; y: number }) => void;
  width?: number;
  height?: number;
}

const Window: React.FC<WindowProps> = ({
  title,
  children,
  position,
  zIndex,
  onClose,
  onFocus,
  onPositionChange,
  width = 400,
  height = 300,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(`.${styles.windowControls}`)) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    onFocus();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      onPositionChange({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, onPositionChange]);

  return (
    <div
      ref={windowRef}
      className={styles.window}
      style={{
        left: position.x,
        top: position.y,
        zIndex,
        width,
        height,
      }}
      onMouseDown={() => onFocus()}
    >
      <div className={styles.windowHeader} onMouseDown={handleMouseDown}>
        <span className={styles.windowTitle}>{title}</span>
        <div className={styles.windowControls}>
          <button className={styles.minimizeBtn}>_</button>
          <button className={styles.maximizeBtn}>□</button>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>
      </div>
      <div className={styles.windowContent}>{children}</div>
    </div>
  );
};

export default Window;
