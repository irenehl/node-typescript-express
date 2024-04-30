import { Db, MongoClient, ServerApiVersion } from 'mongodb';
import logger from './logger';
import { EnvVars } from '../types';

let db: Db;

export async function connection() {
  const connectionString = EnvVars.MONGODB_URI;

  if (!connectionString) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  const client = new MongoClient(connectionString, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  });

  await client.connect();
  await client.db().command({ ping: 1 });
  logger.info('Connected to the database');

  db = client.db();
}

export function getDb() {
  if (!db) {
    throw new Error('Call connection() before using the database');
  }

  return db;
}
