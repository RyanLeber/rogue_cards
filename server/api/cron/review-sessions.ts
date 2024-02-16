
import { createPool } from '@vercel/postgres';

export async function clearSessions() {

  const db = createPool({ connectionString: process.env.POSTGRES_URL_NO_SSL });
  const client = await db.connect();

  try {
    // Retrieve the user's data based on username
    const currentDate = new Date(Date.now())
    await client.sql`Delete FROM sessions WHERE expires_at = ${currentDate.toISOString()}`;

  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
}
