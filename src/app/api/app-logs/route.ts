import { NextRequest, NextResponse } from 'next/server';
import { getLogsCollection, MongoLogEntry } from '@/utils/mongodb';

export async function POST(request: NextRequest) {
  console.log('🔥 API ENDPOINT HIT - /api/app-logs');
  
  try {
    const logData = await request.json();
    
    // Skip window position logs as requested
    if (logData.event && logData.event.includes('Window moved:')) {
      return NextResponse.json({ 
        success: true, 
        message: 'Position log skipped',
        skipped: true
      });
    }
    
    // Print to console for debugging
    console.log('=== STORING APP LOG TO MONGODB ===');
    console.log(`Session: ${logData.sessionId}`);
    console.log(`Event: ${logData.event}`);
    console.log(`Category: ${logData.category}`);
    console.log(`Timestamp: ${logData.timestamp}`);
    console.log('==================================');
    
    // Prepare MongoDB document
    const mongoLogEntry: MongoLogEntry = {
      sessionId: logData.sessionId,
      timestamp: new Date(logData.timestamp || new Date()),
      event: logData.event,
      category: logData.category,
      details: logData.details || {},
      userAgent: logData.userAgent,
      url: logData.url
    };

    // Store in MongoDB
    const collection = await getLogsCollection();
    const result = await collection.insertOne(mongoLogEntry);
    
    console.log(`✅ App log stored in MongoDB with ID: ${result.insertedId}`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'App log stored in MongoDB successfully',
      sessionId: logData.sessionId,
      mongoId: result.insertedId,
      receivedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error processing app log:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to process app log',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  console.log('🔥 API ENDPOINT TEST - /api/app-logs GET');
  return NextResponse.json({ 
    message: 'App Logs API is working',
    timestamp: new Date().toISOString()
  });
}
