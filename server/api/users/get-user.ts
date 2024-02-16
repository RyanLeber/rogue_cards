import { createPool } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  const db = createPool({ connectionString: process.env.POSTGRES_URL_NO_SSL });
  const client = await db.connect();

  try {
    // Retrieve the user's data based on username
    const { rows, rowCount } = await client.sql`SELECT * FROM users WHERE username = ${username}`;
    
    if (rowCount === 0) {
      // No user found with the given username
      throw new Error('Incorrect username or password.');
    }

    // User found, now compare the submitted password with the hashed password stored in the database
    const user = rows[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password_hash);
    
    if (!isPasswordMatch) {
      // Passwords do not match
      throw new Error('Incorrect username or password.');
    }

    // Generate a secure token
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Expires in 30 days

    // Store the session token in the database
    await client.sql`INSERT INTO sessions (user_id, session_token, expires_at) VALUES (${parseInt(user.user_id, 10)}, ${token}, ${expiresAt.toISOString()})`;

    // Set the token in a secure, HttpOnly cookie
    setCookie(event, 'sessionToken', token, {
      httpOnly: true,
      secure: process.env.VERCEL_ENV === 'production',
      path: '/',
      expires: expiresAt
    });

    // await sendRedirect(event, '/profile')

    return {data: "success", status: 200}
  } catch (error) {
    console.error(error);
    // Format the error response appropriately for your front-end
    return createError({ statusCode: 401, statusMessage: 'Authentication failed' });
  } finally {
    client.release();
  }
});
