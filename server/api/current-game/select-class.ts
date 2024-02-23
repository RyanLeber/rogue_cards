
import { createPool } from '@vercel/postgres'


function generateIds() {
  let randomIntegers: number[] = [];
  while (randomIntegers.length < 3) {
    // Generate a random integer between 1 and 22 (inclusive)
    const randomInteger = Math.floor(Math.random() * (22 - 1 + 1)) + 1;

    // Check if the randomInteger is not already in the array
    if (!randomIntegers.includes(randomInteger)) {
      randomIntegers.push(randomInteger);
    }
  }

  const classIds = `{${randomIntegers.join(',')}}`;

  return classIds;
}

export default defineEventHandler(async () => {
  const classIds = generateIds()

  const db = createPool({connectionString: process.env.POSTGRES_URL_NO_SSL}); 
  const client = await db.connect()

  try {
    const { rows } = await client.sql`SELECT * FROM game_classes WHERE class_id= ANY(${classIds})`

    return rows
    
  } catch (error) {
    console.error(error);
    // Properly format the error response
    return createError({ statusCode: 500, statusMessage: 'Internal Server Error'});
  } finally {
    client.release()
  }
});
