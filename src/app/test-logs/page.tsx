'use client';

import { useEffect } from 'react';
import logger from '@/utils/logger';

export default function TestLogsPage() {
  useEffect(() => {
    // Test the API endpoint directly
    const testAPI = async () => {
      try {
        console.log('🧪 Testing API endpoint...');
        
        // Test GET endpoint
        const getResponse = await fetch('/api/logs');
        const getResult = await getResponse.json();
        console.log('GET test result:', getResult);
        
        // Test POST endpoint with sample data
        const testLogData = {
          sessionId: 'test_session_123',
          timestamp: new Date().toLocaleString(),
          level: 'log',
          message: 'This is a test log message',
          userAgent: navigator.userAgent,
          url: window.location.href
        };
        
        const postResponse = await fetch('/api/logs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(testLogData)
        });
        
        const postResult = await postResponse.json();
        console.log('POST test result:', postResult);
        
      } catch (error) {
        console.error('API test failed:', error);
      }
    };
    
    testAPI();
    
    // Test console.log interception
    setTimeout(() => {
      console.log('🧪 This should be sent to server logs');
      console.error('🧪 This error should also be sent to server logs');
      console.warn('🧪 This warning should also be sent to server logs');
    }, 2000);
    
  }, []);

  const handleTestClick = () => {
    console.log('🧪 Button clicked - this should appear in server logs');
    logger.iconClicked('test-button', { x: 100, y: 200 });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Log Testing Page</h1>
      <p className="mb-4">Check the browser console and Vercel logs for output.</p>
      <button 
        onClick={handleTestClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Test Console Log
      </button>
      <div className="mt-4">
        <p>Session ID: {logger.getSessionId()}</p>
        <p>Remote logging enabled: {logger.enableRemoteLogging ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}
