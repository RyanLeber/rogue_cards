import { createPool, sql } from '@vercel/postgres'

async function seed() {
  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS stats (
      gameId PRIMARY KEY,
      userId,
      wins INT,
      tokens INT,
      losses INT,
      gold INT,
      health INT,
      energy INT,
      draw INT,
      relics json,
      trumps json,
      potions json,
      
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `

  console.log(`Created "stats" table`)

  return {
    createTable,
  }
}
export default defineEventHandler(async () => {
  const startTime = Date.now()
  const db = createPool()
  try {
    const { rows: userStats } = await db.query('SELECT * FROM stats')
    const duration = Date.now() - startTime
    return {
      users: userStats,
      duration: duration,
    }
  } catch (error) {
    // @ts-ignore
    if (error?.message === `relation "users" does not exist`) {
      console.log(
        'Table does not exist, creating and seeding it with dummy data now...'
      )
      // Table is not created yet
      await seed()
      const { rows: userStats } = await db.query('SELECT * FROM stats')
      const duration = Date.now() - startTime
      return {
        users: userStats,
        duration: duration,
      }
    } else {
      throw error
    }
  }
})
