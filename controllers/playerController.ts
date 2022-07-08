import { player } from '@prisma/client'
import { Request, Response } from 'express'
import { Logger } from '../src/lib/logger'

import {
  addPlayerService,
  deletePlayerService,
  getPlayersService,
  updatePlayerService,
} from '../services/playerService'
import { ExceptionHandler } from 'winston'

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
    if (e instanceof Error) {
      return res.status(400).send('No player created !')
    }
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
  } catch (e: unknown) {
    Logger.error(e)
    if (e instanceof Error) {
      return res.status(404).send('No players found !')
    }
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
    const result = await updatePlayerService(Number(id), name, country)

    return res.send('Updated player')
  } catch (e) {
    Logger.error(e)
    if (e instanceof Error) {
      return res.status(400).send('Player not updated !')
    }
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
    if (e instanceof Error) {
      return res.status(404).send('Player not found !')
    }
    return res.status(400).send('Something went wrong')
  }
}
