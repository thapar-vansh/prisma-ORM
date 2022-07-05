import { Request, Response } from 'express'
import { Logger } from '../src/lib/logger'

import {
  getTeamStatsService,
  updateTeamStatsService,
} from '../services/teamStatsService'
import {  team_stats } from '@prisma/client'

export const updateTeamStats = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id: string = req.params.id
    const { matches_won, matches_lost } = req.body
    await updateTeamStatsService(Number(id), matches_won, matches_lost)
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
    const team: team_stats | null = await getTeamStatsService(Number(id))
    return res.send(team)
  } catch (e) {
    Logger.error(e)
    return res.status(400).send('Something went wrong')
  }
}
