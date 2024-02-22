import { createPool } from '@vercel/postgres'

export default defineEventHandler(async (event) => {
  const { classId } = await readBody(event);
    const db = createPool({connectionString: process.env.POSTGRES_URL_NO_SSL}); 
    const client = await db.connect()

  
    try {
      const { rows } = await client.sql`SELECT * FROM game_classes WHERE class_id= ${classId}` 
      return {class : rows[0]}
    } catch (error) {
      console.error(error);
      // Properly format the error response
      return createError({ statusCode: 500, statusMessage: 'Internal Server Error'});
    } finally {
      client.release()
    }
});