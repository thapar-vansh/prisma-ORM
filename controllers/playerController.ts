import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const addPlayer = async (req: Request, res: Response) => {
  try {
    const { name, country } = req.body
    const player = await prisma.player.create({
      data: {
        name: name,
        country: country,
      },
    })
    return res.send('Player added')
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}

export const getPlayers = async (req: Request, res: Response) => {
  try {
    const players = await prisma.player.findMany()
    return res.send(players)
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}

export const updatePlayer = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const { name, country } = req.body
    await prisma.player.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
        country: country,
      },
    })
    return res.send('Updated player')
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}

export const deletePlayer = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    await prisma.player.delete({
      where: {
        id: Number(id),
      },
    })
    return res.send('Deleted player')
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}
