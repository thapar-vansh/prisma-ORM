import {player } from '@prisma/client'
import { Request, Response } from 'express'
import { Logger } from '../src/lib/logger'

import {
  addPlayerService,
  deletePlayerService,
  getPlayersService,
  updatePlayerService,
} from '../services/playerService'

export const addPlayer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, country } = req.body
    await addPlayerService(name, country)
    return res.send('Player added')
  } catch (e) {
    Logger.error(e)
    return res.status(400).send('Something went wrong')
  }
}

export const getPlayers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const players: player[] = await getPlayersService()
    return res.send(players)
  } catch (e) {
    Logger.error(e)
    return res.status(400).send('Something went wrong')
  }
}

export const updatePlayer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id: string = req.params.id
    const { name, country } = req.body
    await updatePlayerService(Number(id), name, country)
    return res.send('Updated player')
  } catch (e) {
    Logger.error(e)
    return res.status(400).send('Something went wrong')
  }
}

export const deletePlayer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id: string = req.params.id
    await deletePlayerService(Number(id))
    return res.send('Deleted player')
  } catch (e) {
    Logger.error(e)
    return res.status(400).send('Something went wrong')
  }
}
