
import { createPool } from '@vercel/postgres'

export default defineEventHandler(async (event) => {
  const { potionIds} = await readBody(event);
    const db = createPool({connectionString: process.env.POSTGRES_URL_NO_SSL}); 
    const client = await db.connect()

    const potions = `{${potionIds.join(',')}}`;
  
    try {
      const { rows } = await client.sql`SELECT * FROM game_potions WHERE potion_id= ANY(${potions})` 
      return rows
      
    } catch (error) {
      console.error(error);
      // Properly format the error response
      return createError({ statusCode: 500, statusMessage: 'Internal Server Error'});
    } finally {
      client.release()
    }
});