
import { createPool } from '@vercel/postgres'

export default defineEventHandler(async (event) => {
  const { trumpIds} = await readBody(event);
    const db = createPool({connectionString: process.env.POSTGRES_URL_NO_SSL}); 
    const client = await db.connect()

    console.log(trumpIds)
    const trumps = `{${trumpIds.join(',')}}`;
  
    try {
      const { rows } = await client.sql`SELECT * FROM game_trump_cards WHERE trump_id= ANY(${trumps})` 
      return {trumps : rows}
    } catch (error) {
      console.error(error);
      // Properly format the error response
      return createError({ statusCode: 500, statusMessage: 'Internal Server Error'});
    } finally {
      client.release()
    }
});
