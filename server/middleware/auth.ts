
import { createPool } from '@vercel/postgres';

export default defineEventHandler(async (event) => {

  const token = getCookie(event, 'session_token');

  const db = createPool({ connectionString: process.env.POSTGRES_URL_NO_SSL });
  const client = await db.connect();
  try {
    const { rows, rowCount } = await client.sql`SELECT * FROM sessions WHERE session_token = ${token}`;
    if (rowCount > 0) {

      event.context.session_token = token
      event.context.user = rows[0].user_id
    } else {
      // Handle invalid or expired session token
      event.context.session_token = null;
      event.context.user = null;
    }

  } catch (error) {
    console.error('Session validation error:', error);
    event.context.session_token = null
    event.context.user = null
  } finally {
    client.release();
  }
});