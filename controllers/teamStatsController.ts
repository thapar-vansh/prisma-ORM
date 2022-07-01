import { Request, Response } from 'express'
import { Logger } from '../src/lib/logger'

import {
  getTeamStatsService,
  updateTeamStatsService,
} from '../services/teamStatsService'
import { Team, TeamStats } from '@prisma/client'

export const updateTeamStats = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id: string = req.params.id
    const { matchesWon, matchesLost } = req.body
    await updateTeamStatsService(Number(id), matchesWon, matchesLost)

    return res.send('Updated match stats')
  } catch (e) {
    Logger.error(e)
    return res.status(400).send('Something went wrong')
  }
}

export const getTeamStats = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id: string = req.params.id
    const team: TeamStats | null = await getTeamStatsService(Number(id))
    return res.send(team)
  } catch (e) {
    Logger.error(e)
    return res.status(400).send('Something went wrong')
  }
}
