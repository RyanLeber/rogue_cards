
import { createPool } from '@vercel/postgres'

export default defineEventHandler(async (event) => {
  const { classId, gameToken } = await readBody(event);

  const userToken = getCookie(event, 'sessionToken');

  const db = createPool({connectionString: process.env.POSTGRES_URL_NO_SSL}); 
  const client = await db.connect()

  try {
    // Retrieve the user's data based on username
    const { rows: sessionRows, rowCount } = await client.sql`SELECT * FROM sessions WHERE session_token = ${userToken}`;
    // No user found with the given username
    if (rowCount === 0) return new Error('User in not logged in');
    
    const userSession = sessionRows[0];

    const { rows: gameRows } = await client.sql`SELECT * FROM games WHERE game_token = ${parseInt(gameToken, 10)}`;
    
    await client.sql`UPDATE user_games SET class_id= ${classId} WHERE game_id= ${parseInt(gameRows[0].game_id, 10)} AND user_id= ${parseInt(userSession.user_id, 10)}`;

  } catch (error) {
    console.error(error);
    // Properly format the error response
    return createError({ statusCode: 500, statusMessage: 'Internal Server Error'});
  } finally {
    client.release()
  }
});
