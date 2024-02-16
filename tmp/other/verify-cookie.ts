
import { createPool } from '@vercel/postgres';

export default defineEventHandler(async (event) => {

  const token = getCookie(event, 'session_token');

  const db = createPool({ connectionString: process.env.POSTGRES_URL_NO_SSL });
  const client = await db.connect();
  try {
    const { rows: sessionRows, rowCount } = await client.sql`SELECT * FROM sessions WHERE session_token = ${token}`;
    if (rowCount < 1) {
      return {
        verified: false,
        cookie: token
      }
    }
    return {
      verified: true,
      cookie: token
    }
  } catch (error) {
    console.log(error)
  } finally {
    client.release();
  }
  
});