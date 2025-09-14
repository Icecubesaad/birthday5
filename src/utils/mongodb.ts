import { MongoClient, Db, Collection } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const dbName = 'birthday_logs';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToMongoDB(): Promise<Db> {
  if (db) {
    return db;
  }

  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to MongoDB successfully');
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export async function getLogsCollection(): Promise<Collection> {
  const database = await connectToMongoDB();
  return database.collection('user_logs');
}

export async function closeConnection(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}

// Log entry interface for MongoDB
export interface MongoLogEntry {
  _id?: string;
  sessionId: string;
  timestamp: Date;
  event: string;
  category: 'icon' | 'window' | 'music' | 'wish' | 'camera' | 'system' | 'console';
  details: Record<string, unknown>;
  userAgent?: string;
  url?: string;
  level?: string; // for console logs
  message?: string; // for console logs
}
