import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Always log that the endpoint was hit
  console.log('🔥 API ENDPOINT HIT - /api/logs');
  
  try {
    const logData = await request.json();
    
    // Print to Vercel logs with detailed information
    console.log('=== REMOTE CONSOLE LOG ===');
    console.log(`Session: ${logData.sessionId}`);
    console.log(`Timestamp: ${logData.timestamp}`);
    console.log(`Level: ${logData.level?.toUpperCase() || 'UNKNOWN'}`);
    console.log(`URL: ${logData.url}`);
    console.log(`User Agent: ${logData.userAgent}`);
    console.log(`Message: ${logData.message}`);
    console.log('========================');
    
    // Also log as a single line for easier searching
    console.log(`[${logData.level?.toUpperCase() || 'LOG'}] ${logData.sessionId} | ${logData.message}`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Log received and printed to server logs',
      sessionId: logData.sessionId,
      receivedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error processing log:', error);
    console.log('Request body parsing failed');
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to process log',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Add a GET endpoint for testing
export async function GET() {
  console.log('🔥 API ENDPOINT TEST - /api/logs GET');
  return NextResponse.json({ 
    message: 'Logs API is working',
    timestamp: new Date().toISOString()
  });
}
