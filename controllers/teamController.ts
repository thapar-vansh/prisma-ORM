import { Request, Response } from 'express'
import { Logger } from '../src/lib/logger'

import {
  addTeamService,
  deleteTeamService,
  getTeamsService,
} from '../services/teamService'
import { Team } from '@prisma/client'
export const addTeam = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, teamId } = req.body
    await addTeamService(name, teamId)
    return res.send('Team added')
  } catch (e) {
    Logger.error(e)
    return res.status(400).send('Something went wrong')
  }
}

export const getTeams = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const teams: Team[] | null = await getTeamsService()
    return res.send(teams)
  } catch (e) {
    Logger.error(e)
    return res.status(400).send('Something went wrong')
  }
}

export const deleteTeam = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id: string = req.params.teamId
    await deleteTeamService(Number(id))
    return res.send('Deleted team')
  } catch (e) {
    Logger.error(e)
    return res.status(400).send('Something went wrong')
  }
}
