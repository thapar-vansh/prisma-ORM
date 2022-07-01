import { prisma } from '../src/index'
import { TeamStats } from '@prisma/client'

export const getTeamStatsService = async (id: number): Promise<TeamStats | null> => {
  const teamStats: TeamStats | null = await prisma.teamStats.findUnique({
    where: {
      id: id,
    },
  })
  if (!teamStats) {
    throw new Error('Team not found')
  }
  return teamStats as TeamStats
}

export const 
updateTeamStatsService = async (
  id: number,
  matchesWon: number,
  matchesLost: number
): Promise<void> => {
  if (matchesLost + matchesWon === 14) {
    await prisma.teamStats.upsert({
      where: {
        id: id,
      },
      update: {
        matchesLost: matchesLost,
        matchesWon: matchesWon,
      },
      create:{
        id:id,
        totalMatches:14,
        matchesLost:matchesLost,
        matchesWon:matchesWon
      }
    })
  } else {
    throw new Error('Data not valid')
  }
}
