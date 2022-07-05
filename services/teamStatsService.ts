import prisma from '../src/index'
import { team_stats } from '@prisma/client'

export const getTeamStatsService = async (
  id: number
): Promise<team_stats | null> => {
  const teamStats: team_stats | null = await prisma.team_stats.findUnique({
    where: {
      id: id,
    },
  })
  if (!teamStats) {
    throw new Error('Team not found')
  }
  return teamStats as team_stats
}

export const updateTeamStatsService = async (
  id: number,
  matchesWon: number,
  matchesLost: number
): Promise<number> => {
  if (matchesLost + matchesWon == 14) {
    await prisma.team_stats.update({
      where: {
        id: id,
      },
      data: {
        matches_lost: matchesLost,
        matches_won: matchesWon,
      },
    })
    return 0
  } else {
    throw new Error('Data not valid')
  }
}
