import { createPool } from '@vercel/postgres';
import crypto from 'crypto'

function generateSecureGameId() {
  const min = 10000000;
  const max = 99999999;
  const difference = max - min;
  let rand = parseInt(crypto.randomBytes(4).toString('hex'), 16);
  rand = Math.floor(rand % (difference + 1));
  return min + rand;
}

export default defineEventHandler(async (event) => {
  const { gameName } = await readBody(event);

  const userToken = getCookie(event, 'sessionToken')

  const db = createPool({ connectionString: process.env.POSTGRES_URL_NO_SSL });
  const client = await db.connect();

  try {
    // Retrieve the user's data based on username
    const { rows: sessionRows, rowCount } = await client.sql`SELECT * FROM sessions WHERE session_token = ${userToken}`;
    
    if (rowCount === 0) {
      // No user found with the given username
      throw new Error('User in not logged in');
    }
    
    const userSession = sessionRows[0] 

    // Generate a secure token
    const gameToken: number = generateSecureGameId();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Expires in 30 days

    // Store the session token in the database
    await client.sql`INSERT INTO games (game_name, game_token, expires_at) VALUES (${gameName}, ${gameToken}, ${expiresAt.toISOString()})`;

    const { rows: gameRows } = await client.sql`SELECT * FROM games WHERE game_token = ${gameToken}`;

    const game = gameRows[0]

    await client.sql`INSERT INTO user_games (game_id, user_id, expires_at) VALUES (${parseInt(game.game_id, 10)}, ${parseInt(userSession.user_id, 10)}, ${expiresAt.toISOString()})`;

    return gameToken

  } catch (error) {
    console.error(error);
    // Format the error response appropriately for your front-end
    return createError({ statusCode: 401, statusMessage: 'Authentication failed' });
  } finally {
    client.release();
  }
});



// const { rows } = await client.sql`SELECT * FROM games WHERE game_token = ${gameToken}`;

// await client.sql`INSERT INTO user_games (game_id, user_id, expiresAt) VALUES (${gameName}, ${gameToken}, ${expiresAt.toISOString()})`;
