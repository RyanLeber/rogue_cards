
import { createPool } from '@vercel/postgres';

interface UserGame {
  game_id: number;
}

export default defineEventHandler(async (event) => {
  const userToken = getCookie(event, 'sessionToken')
  const test = getCookie(event, 'gameStore')
  console.log('Game Store:', test)

  const db = createPool({ connectionString: process.env.POSTGRES_URL_NO_SSL });
  const client = await db.connect();

  try {
    const { rows: userRows, rowCount } = await client.sql`SELECT * FROM sessions WHERE session_token= ${userToken}`;
    if (rowCount < 1) throw new Error('User not found.');

    const userId = userRows[0].user_id

    const { rows: usersGameIds } = await client.sql`SELECT * FROM user_games WHERE user_id= ${userId}`;

    const gameIds = usersGameIds.map((game: UserGame) => game.game_id);

    const gameIdsString = `{${gameIds.join(',')}}`;

    const { rows: gameRows } = await client.sql`SELECT * FROM games WHERE game_id= ANY(${gameIdsString}::INT[])`;

    return gameRows

  } catch ( error ) {
    console.error("get-games error:",error)
    return createError({ statusCode: 401, statusMessage: 'No games to return' });
  } finally {
    client.release()
  }
});

// using JSON.stringify(), how can I make an array like, [9,3,1], into a string like, {9,3,1}
