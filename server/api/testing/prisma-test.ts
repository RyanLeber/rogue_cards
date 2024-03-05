
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

  const sessionToken = getCookie(event, 'sessionToken')
  // const gameToken = getCookie(event, 'gameStore')
  try {
    const session = await prisma.sessions.findUnique({
      where: {
        session_token: sessionToken,
      },
      select: {
        user_id: true
      },
    });
    if (!session) return Error('User not found' );
    // if (!session) return createError({ statusCode: 404, statusMessage: 'User not found' });

    const userGames = await prisma.user_games.findMany({
      where: {
        user_id: session.user_id,
      },
      select: {
        game_id: true,
      },
    });
    if (userGames.length == 0) return Error('No games to return');
    // if (userGames.length == 0) return createError({ statusCode: 204, statusMessage: 'No games to return' });

    const gameIds = userGames.map(userGame => userGame.game_id);
    const games = await prisma.games.findMany({
      where: {
        game_id: {
          in: gameIds,
        },
      },
    });
    return games.length > 0 ? games : Error('No games to return');
    // return games.length > 0 ? games : createError({ statusCode: 204, statusMessage: 'No games to return'});

  } catch ( error ) {
    console.error("get-games error:",error)
    return createError({ statusCode: 401, statusMessage: 'No games to return' });
  }
});
