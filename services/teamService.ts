import { Team } from '@prisma/client'
import { prisma } from '../src/index'
import { getTeamStatsService } from './teamStatsService'

export const addTeamService = async (
  name: string,
  teamId: number
): Promise<void> => {
  await prisma.teamStats.create({
    data: {
      id: teamId as number,
      totalMatches: 14,
      matchesWon: 0,
      matchesLost: 0,
    },
  })

  await prisma.team.create({
    data: {
      name: name as string,
      teamId: teamId as number,
    },
  })
}

export const getTeamsService = async (): Promise<Team[] | null> => {
  const teams: Team[] = await prisma.team.findMany()
  if (teams.length === 0) {
    throw new Error('No teams found')
  }
  return teams
}

export const deleteTeamService = async (id: number): Promise<void> => {
  const team = await getTeamStatsService(id)
  if (team) {
    await prisma.team.delete({
      where: {
        teamId: Number(id),
      },
    })
    await prisma.teamStats.delete({
      where: {
        id: Number(id),
      },
    })
  } else {
    throw new Error('Invalid id ! Team does not exists')
  }
}
