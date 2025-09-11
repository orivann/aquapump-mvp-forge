import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const connectDb = async () => {
  try {
    await pool.connect();
    console.log('PostgreSQL connected');
  } catch (err) {
    console.error('Connection error', err);
    process.exit(1);
  }
};

export const query = (text: string, params: any[]) => pool.query(text, params);
