import { createPool } from '@vercel/postgres'

export default defineEventHandler(async (event) => {
  const { gameToken } = await readBody(event);

  const userToken = getCookie(event, 'sessionToken');

  const db = createPool({connectionString: process.env.POSTGRES_URL_NO_SSL}); 
  const client = await db.connect()

  try {
    // Retrieve the user's data based on username
    const { rows: sessionRows, rowCount } = await client.sql`SELECT * FROM sessions WHERE session_token = ${userToken}`;
    // No user found with the given username
    if (rowCount === 0) return new Error('User in not logged in');
    
    const userSession = sessionRows[0];

    const { rows: gameRows, rowCount: gameCount } = await client.sql`SELECT * FROM games WHERE game_token = ${gameToken}`;
    if ( gameCount == 0 ) return new Error('No game token')

    const {rows: userGamesRows} = await client.sql`SELECT * FROM user_games WHERE game_id= ${parseInt(gameRows[0].game_id, 10)} AND user_id= ${parseInt(userSession.user_id, 10)}`;
    if (!userGamesRows[0].class_id) return new Error('class not set')

    const { rows } = await client.sql`SELECT * FROM game_classes WHERE class_id= ${userGamesRows[0].class_id}`

    return rows[0]

  } catch (error) {
      console.error(error);
      // Properly format the error response
      return createError({ statusCode: 500, statusMessage: 'Internal Server Error'});
    } finally {
      client.release()
    }
});