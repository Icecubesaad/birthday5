'use client';

interface LogEntry {
  timestamp: string;
  event: string;
  details: Record<string, unknown>;
  category: 'icon' | 'window' | 'music' | 'wish' | 'camera' | 'system';
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 100;
  private originalConsoleLog: typeof console.log;
  private remoteLoggingEnabled = false;
  private sessionId: string;

  constructor() {
    this.originalConsoleLog = console.log;
    this.sessionId = this.generateSessionId();
    this.setupConsoleInterception();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private formatTimestamp(): string {
    const now = new Date();
    return now.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }

  private setupConsoleInterception(): void {
    if (typeof window !== 'undefined') {
      // Override console.log to capture all console output
      console.log = (...args: any[]) => {
        // Call original console.log
        this.originalConsoleLog.apply(console, args);
        
        // Send to remote logging if enabled
        this.sendConsoleLogToRemote('log', args);
      };

      // Also capture console.error, console.warn, etc.
      const originalError = console.error;
      console.error = (...args: any[]) => {
        originalError.apply(console, args);
        this.sendConsoleLogToRemote('error', args);
      };

      const originalWarn = console.warn;
      console.warn = (...args: any[]) => {
        originalWarn.apply(console, args);
        this.sendConsoleLogToRemote('warn', args);
      };
    }
  }

  private sendConsoleLogToRemote(level: string, args: any[]): void {
    if (!this.remoteLoggingEnabled || typeof window === 'undefined') return;

    try {
      const logData = {
        sessionId: this.sessionId,
        timestamp: this.formatTimestamp(),
        level,
        message: args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' '),
        userAgent: navigator.userAgent,
        url: window.location.href
      };

      // Send to webhook or logging service
      this.sendToWebhook(logData);
      
      // Also store locally as backup
      this.storeConsoleLogLocally(logData);
    } catch (e) {
      this.originalConsoleLog('Failed to send remote log:', e);
    }
  }

  private async sendToWebhook(logData: any): Promise<void> {
    try {
      // Send to our API endpoint
      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData)
      });
      
      const result = await response.json();
      if (result.success) {
        // Log the response to show it worked
        this.originalConsoleLog('✅ Log sent to server:', result.message);
      }
    } catch (e) {
      // Silently fail to avoid infinite loops
    }
  }

  private storeConsoleLogLocally(logData: any): void {
    try {
      const existingLogs = localStorage.getItem('remote_console_logs');
      const logs = existingLogs ? JSON.parse(existingLogs) : [];
      logs.unshift(logData);
      
      // Keep only last 50 console logs
      if (logs.length > 50) {
        logs.splice(50);
      }
      
      localStorage.setItem('remote_console_logs', JSON.stringify(logs));
    } catch (e) {
      // Ignore storage errors
    }
  }

  private addLog(category: LogEntry['category'], event: string, details: Record<string, unknown> = {}): void {
    const logEntry: LogEntry = {
      timestamp: this.formatTimestamp(),
      event,
      details,
      category
    };

    this.logs.unshift(logEntry); // Add to beginning

    // Keep only the most recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }

    // Console logging for development
    console.log(`[${category.toUpperCase()}] ${event}`, details);

    // Store in localStorage for persistence (client-side only)
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('birthday_logs', JSON.stringify(this.logs));
      } catch (e) {
        console.warn('Could not save logs to localStorage:', e);
      }
    }
  }

  // Icon interactions
  iconClicked(iconName: string, position: { x: number; y: number }): void {
    this.addLog('icon', `Icon clicked: ${iconName}`, {
      iconName,
      position,
      action: 'click'
    });
  }

  // Window management
  windowOpened(windowName: string, position: { x: number; y: number }): void {
    this.addLog('window', `Window opened: ${windowName}`, {
      windowName,
      position,
      action: 'open'
    });
  }

  windowClosed(windowName: string): void {
    this.addLog('window', `Window closed: ${windowName}`, {
      windowName,
      action: 'close'
    });
  }

  windowFocused(windowName: string, zIndex: number): void {
    this.addLog('window', `Window focused: ${windowName}`, {
      windowName,
      zIndex,
      action: 'focus'
    });
  }

  windowMoved(windowName: string, newPosition: { x: number; y: number }): void {
    this.addLog('window', `Window moved: ${windowName}`, {
      windowName,
      newPosition,
      action: 'move'
    });
  }

  // Music player
  musicPlayed(songName: string, songDescription: string, imagePath: string): void {
    this.addLog('music', `Playing: ${songName}`, {
      songName,
      songDescription,
      imagePath,
      action: 'play'
    });
  }

  musicPaused(songName: string): void {
    this.addLog('music', `Paused: ${songName}`, {
      songName,
      action: 'pause'
    });
  }

  musicSeeked(songName: string, fromTime: number, toTime: number): void {
    this.addLog('music', `Seeked: ${songName}`, {
      songName,
      fromTime: `${Math.floor(fromTime / 60)}:${Math.floor(fromTime % 60).toString().padStart(2, '0')}`,
      toTime: `${Math.floor(toTime / 60)}:${Math.floor(toTime % 60).toString().padStart(2, '0')}`,
      action: 'seek'
    });
  }

  // Wish window
  wishEntered(wish: string): void {
    this.addLog('wish', 'Wish entered', {
      wish,
      length: wish.length,
      action: 'submit'
    });
  }

  wishCleared(): void {
    this.addLog('wish', 'Wish cleared', {
      action: 'clear'
    });
  }

  // Polaroid camera
  cameraClicked(photoCount: number, imageIndex: number, imageName: string): void {
    this.addLog('camera', `Photo taken #${photoCount}`, {
      photoNumber: photoCount,
      imageIndex,
      imageName,
      totalPhotos: photoCount,
      action: 'click'
    });
  }

  cameraReset(): void {
    this.addLog('camera', 'Camera reset (all images used)', {
      action: 'reset'
    });
  }

  // System events
  systemUnlocked(): void {
    this.addLog('system', 'Lock screen unlocked', {
      action: 'unlock'
    });
  }

  systemInitialized(): void {
    this.addLog('system', 'Birthday website initialized', {
      action: 'init'
    });
  }

  // Get logs
  getLogs(category?: LogEntry['category']): LogEntry[] {
    if (category) {
      return this.logs.filter(log => log.category === category);
    }
    return this.logs;
  }

  getRecentLogs(count: number = 10): LogEntry[] {
    return this.logs.slice(0, count);
  }

  // Clear logs
  clearLogs(): void {
    this.logs = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem('birthday_logs');
    }
    this.addLog('system', 'Logs cleared', { action: 'clear_logs' });
  }

  // Enable/disable remote logging
  enableRemoteLogging(): void {
    this.remoteLoggingEnabled = true;
    this.addLog('system', 'Remote logging enabled', { sessionId: this.sessionId });
  }

  disableRemoteLogging(): void {
    this.remoteLoggingEnabled = false;
    this.addLog('system', 'Remote logging disabled', {});
  }

  // Get console logs from localStorage
  getConsoleLogsFromStorage(): any[] {
    if (typeof window !== 'undefined') {
      try {
        const logs = localStorage.getItem('remote_console_logs');
        return logs ? JSON.parse(logs) : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  }

  // Get current session ID
  getSessionId(): string {
    return this.sessionId;
  }

  // Load logs from localStorage (client-side only)
  loadLogs(): void {
    if (typeof window !== 'undefined') {
      try {
        const savedLogs = localStorage.getItem('birthday_logs');
        if (savedLogs) {
          const parsedLogs = JSON.parse(savedLogs);
          if (Array.isArray(parsedLogs)) {
            this.logs = parsedLogs;
          }
        }
      } catch (e) {
        console.warn('Could not load logs from localStorage:', e);
      }
    }
  }
}

// Create singleton instance
const logger = new Logger();

// Load existing logs on initialization
logger.loadLogs();

// Auto-enable remote logging for debugging
if (typeof window !== 'undefined') {
  logger.enableRemoteLogging();
  console.log('🔥 Remote logging auto-enabled. Session ID:', logger.getSessionId());
}

export default logger;
