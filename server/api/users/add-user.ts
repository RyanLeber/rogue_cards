// export default defineEventHandler(async (event) => {
//   console.log()
//   return 'test text'
// })
// import { sql } from '@vercel/postgres';

// export default defineEventHandler(async (event) => {
//   const query = getQuery(event)
//   const username = query.username
//   const password_hash = query.password.hash() // Will use bcrypt, this is just the idea
//   try {
//     const { rows : user} = await sql`SELECT * FROM users WHERE username= ${username}`;
//     if ( user ) throw new Error('Username is already taken.');

//     await sql`INSERT INTO users (username, password) VALUES (${username}, ${password_hash});`;

//     const { rows : userId} = await sql`SELECT userId FROM users WHERE username= ${username}`
//     return userId
//   } catch (error) {
//     return error
//   }
// })

import { createPool, db, sql } from '@vercel/postgres'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);
  const passwordHash = await bcrypt.hash(password, 10); // Hashing the password

  // const db = createPool(); // Assume this connects to your PostgreSQL database

  try {
    // Check if the username already exists
    const { rowCount: userExists } = await sql`SELECT * FROM users WHERE username = ${username}`;
    if (userExists > 0) throw new Error('Username is already taken.');

    // Insert the new user
    await sql`INSERT INTO users (username, passwordhash) VALUES (${username}, ${passwordHash})`;

    // Retrieve the new user's ID
    const { rows: userId } = await sql`SELECT userId FROM users WHERE username = ${username}`;
    
    return userId[0]; // Assuming ID is what you want to return
  } catch (error) {
    console.error(error);
    // Properly format the error response
    return createError({ statusCode: 500, statusMessage: 'Internal Server Error'});
  }
});



// .env*.local, .env
// export default defineEventHandler(async (event) => {
//   const { username, password } = await readBody(event);
//   const passwordHash = await bcrypt.hash(password, 10); // Hashing the password

//   const db = createPool(); // Assume this connects to your PostgreSQL database

//   try {
//     // Check if the username already exists
//     const { rowCount: userExists } = await db.query('SELECT 1 FROM users WHERE username = $1', [username]);
//     if (userExists > 0) throw new Error('Username is already taken.');

//     // Insert the new user
//     await db.query('INSERT INTO users (username, passwordhash) VALUES ($1, $2)', [username, passwordHash]);

//     // Retrieve the new user's ID
//     const { rows: userId } = await db.query('SELECT userId FROM users WHERE username = $1', [username]);
    
//     return userId[0]; // Assuming ID is what you want to return
//   } catch (error) {
//     console.error(error);
//     // Properly format the error response
//     return createError({ statusCode: 500, statusMessage: 'Internal Server Error'});
//   }
// });
