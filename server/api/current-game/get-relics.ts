
import { createPool } from '@vercel/postgres'

export default defineEventHandler(async (event) => {
  const { relicIds } = await readBody(event);
    const db = createPool({connectionString: process.env.POSTGRES_URL_NO_SSL}); 
    const client = await db.connect()

    const relics = `{${relicIds.join(',')}}`;
  
    try {
      const { rows } = await client.sql`SELECT * FROM game_relics WHERE relic_id= ANY(${relics})` 
      return rows

    } catch (error) {
      console.error(error);
      // Properly format the error response
      return createError({ statusCode: 500, statusMessage: 'Internal Server Error'});
    } finally {
      client.release()
    }
});
