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
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        phone VARCHAR(255),
        service VARCHAR(255),
        message TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (err) {
    console.error('Connection error', err);
    process.exit(1);
  }
};

export const query = (text: string, params: unknown[]) => pool.query(text, params);
