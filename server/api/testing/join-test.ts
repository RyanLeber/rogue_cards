
import { createPool } from '@vercel/postgres';

export default defineEventHandler(async (event) => {
  const { gameToken } = await readBody(event);

  const db = createPool({ connectionString: process.env.POSTGRES_URL_NO_SSL });
  const client = await db.connect();

  try {
    const { rows: gameRows, rowCount: gameCount } = await client.sql`SELECT * FROM games WHERE game_token = ${gameToken}`;
    // Game not found for the provided game code
    if (gameCount === 0) return Error('Invalid game code. Check your code for errors.');

    const game = gameRows[0];

    const gameName: string = game.game_name

    return  gameName;

  } catch (error) {
    console.error(error);
    // Format the error response appropriately for your front-end
    return createError({ statusCode: 401, statusMessage: 'Unable to join game' });
  } finally {
    client.release();
  }
});