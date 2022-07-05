import { team } from '@prisma/client'
import prisma from '../src/index'
import { getTeamStatsService } from './teamStatsService'

export const addTeamService = async (name: string): Promise<number> => {
  await prisma.team_stats.create({
    data: {
      total_matches: 14,
      matches_won: 0,
      matches_lost: 0,
    },
  })

  await prisma.team.create({
    data: {
      name: name as string,
    },
  })

  return 0
}

export const getTeamsService = async (): Promise<team[] | null> => {
  const teams: team[] = await prisma.team.findMany()
  if (teams.length === 0) {
    throw new Error('No teams found')
  }
  return teams
}

export const deleteTeamService = async (id: number): Promise<number> => {
  const team = await getTeamStatsService(id)
  if (team) {
    await prisma.team.delete({
      where: {
        id: Number(id),
      },
    })
    await prisma.team_stats.delete({
      where: {
        id: Number(id),
      },
    })
    return 0
  } else {
    throw new Error('Invalid id ! Team does not exists')
  }
}
