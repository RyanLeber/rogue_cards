import { createPool } from '@vercel/postgres'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);
  const passwordHash = await bcrypt.hash(password, 10); 

  const db = createPool({connectionString: process.env.POSTGRES_URL_NO_SSL}); 
  const client = await db.connect()

  try {
    // Check if the username already exists
    const { rowCount: userExists } = await client.sql`SELECT * FROM users WHERE username = ${username}`;
    if (userExists > 0) throw new Error('Username is already taken.');

    // Insert the new user
    await client.sql`INSERT INTO users (username, password_hash) VALUES (${username}, ${passwordHash})`;

    // Retrieve the new user's ID
    const { rows: userId } = await client.sql`SELECT user_id FROM users WHERE username = ${username}`;
    
    return userId[0]; // Assuming ID is what you want to return
  } catch (error) {
    console.error(error);
    // Properly format the error response
    return createError({ statusCode: 500, statusMessage: 'Internal Server Error'});
  } finally {
    client.release()
  }
});
 