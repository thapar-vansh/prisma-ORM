import prisma from '../src/index'
import { team_stats } from '@prisma/client'

export const addTeamStats = async (): Promise<team_stats> => {
  const teamStats: team_stats = await prisma.team_stats.create({
    data: {
      total_matches: 14,
      matches_won: 0,
      matches_lost: 0,
    },
  })
  if (!teamStats) {
    throw new Error('No stats created !')
  }
  return teamStats
}

export const getTeamStatsService = async (
  id: number
): Promise<team_stats | null> => {
  const teamStats: team_stats | null = await prisma.team_stats.findUnique({
    where: {
      id: id,
    },
  })
  if (teamStats === null) {
    throw new Error('Team not found')
  }
  return teamStats
}

export const updateTeamStatsService = async (
  id: number,
  matchesWon: number,
  matchesLost: number
): Promise<team_stats> => {
  if (matchesLost + matchesWon == 14) {
    return await prisma.team_stats.update({
      where: {
        id: id,
      },
      data: {
        matches_lost: matchesLost,
        matches_won: matchesWon,
      },
    })
  } else {
    throw new Error('Data not valid')
  }
}

export const deleteTeamStats = async (id: number): Promise<team_stats> => {
  const deletedTeamStats: team_stats = await prisma.team_stats.delete({
    where: {
      id: id,
    },
  })
  if (!deletedTeamStats) {
    throw new Error('No stats deleted !')
  }
  return deletedTeamStats
}
