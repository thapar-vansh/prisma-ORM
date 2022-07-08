import { team, team_stats } from '@prisma/client'
import prisma from '../src/index'
import {
  getTeamStatsService,
  addTeamStats,
  deleteTeamStats,
} from './teamStatsService'

export const addTeamService = async (name: string): Promise<team> => {
  const teamStats = await addTeamStats()
  const team: team = await prisma.team.create({
    data: {
      name: name as string,
    },
  })
  if (!team && !teamStats) {
    throw new Error('No team created !')
  }
  return team
}

export const getTeamsService = async (): Promise<team[]> => {
  const teams: team[] = await prisma.team.findMany()
  if (teams.length === 0) {
    throw new Error('No teams found')
  }
  return teams
}

export const deleteTeamService = async (
  id: number
): Promise<team_stats | team> => {
  const team = await getTeamStatsService(id)
  if (team === null) {
    throw new Error('Invalid id ! Team does not exists')
  }

  await prisma.team.delete({
    where: {
      id: id,
    },
  })

  await deleteTeamStats(id)
  return team
}
