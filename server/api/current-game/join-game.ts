
import { createPool } from '@vercel/postgres';

export default defineEventHandler(async (event) => {
  const { gameToken } = await readBody(event);

  const userToken = getCookie(event, 'sessionToken');

  const db = createPool({ connectionString: process.env.POSTGRES_URL_NO_SSL });
  const client = await db.connect();

  try {
    // Retrieve the user's data based on username
    const { rows: sessionRows, rowCount } = await client.sql`SELECT * FROM sessions WHERE session_token = ${userToken}`;
    
    // No user found with the given username
    if (rowCount === 0) return new Error('User in not logged in');
    
    const userSession = sessionRows[0];

    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Expires in 30 days

    const { rows: gameRows, rowCount: gameCount } = await client.sql`SELECT * FROM games WHERE game_token = ${gameToken}`;
    // Game not found for the provided game code
    if (gameCount === 0) return Error('Invalid game code. Check your code for errors.');

    const game = gameRows[0];

    const gameId: number = parseInt(game.game_id, 10)
    const userId: number = parseInt(userSession.user_id, 10)
    
    const { rowCount: userGamesCount } = await client.sql`SELECT * FROM user_games WHERE game_id= ${gameId} AND user_id= ${userId}`;
    if (userGamesCount === 0) {
      await client.sql`INSERT INTO user_games (game_id, user_id, expires_at) VALUES (${gameId}, ${userId}, ${expiresAt.toISOString()})`;
    }

    // const { rowCount: gameSessionCount } = await client.sql`SELECT * FROM game_session WHERE game_id= ${gameId}`;
    // if ( gameSessionCount === 0 ) {

    //   await client.sql`INSERT INTO game_session (game_id, players, current_player, rounds, expires_at)
    //                     VALUES (${gameId}, ARRAY[${userId}], ${userId}, ${0}, ${expiresAt.toISOString()})`;
    // } else {
    //   await client.sql`
    //                   UPDATE game_session
    //                   SET players = array_append(players, ${userId})
    //                   WHERE 
    //                   `;
    // }

    const gameName: string = game.game_name

    return gameName;

  } catch (error) {
    console.error(error);
    // Format the error response appropriately for your front-end
    return createError({ statusCode: 401, statusMessage: 'Unable to join game' });
  } finally {
    client.release();
  }
});
 