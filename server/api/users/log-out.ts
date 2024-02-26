 
import { createPool } from '@vercel/postgres'

export default defineEventHandler(async (event) => {

  console.log('Log-out route hit');
  const db = createPool({connectionString: process.env.POSTGRES_URL_NO_SSL}); 
  const client = await db.connect()

  const token = getCookie(event, 'sessionToken')

  try {
    await client.sql`DELETE FROM sessions WHERE session_token= ${token}`;

    deleteCookie(event, 'sessionToken')
    deleteCookie(event, 'gameStore')
    event.context.session_token = null
    event.context.user = null
    return { success: true };
  } catch (error) {
    console.error(error);
    return error
  } finally {
    client.release()
  }
});