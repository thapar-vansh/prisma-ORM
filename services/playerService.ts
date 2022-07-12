import prisma from '../src/index'
import { player } from '@prisma/client'

export const addPlayerService = async (
  name: string,
  country: string
): Promise<player> => {
  const result = await prisma.player.create({
    data: {
      name: name as string,
      country: country as string,
    },
  })
  if (!result) {
    throw new Error('No player created !')
  }
  return result
}
export const getPlayersService = async (): Promise<player[]> => {
  const players: player[] = await prisma.player.findMany()
  if (players.length === 0) {
    throw new Error('No players found !')
  }
  return players
}

export const updatePlayerService = async (
  id: number,
  name: string,
  country: string
): Promise<player> => {
  const result = await prisma.player.upsert({
    where: {
      id: Number(id),
    },
    update: {
      name: name as string,
      country: country as string,
    },
    create: {
      name: name as string,
      country: country as string,
    },
  })
  if (!result) {
    throw new Error('Player not updated !')
  }
  return result
}

export const getPlayerByIdService = async (
  id: number
): Promise<player | null> => {
  const player: player | null = await prisma.player.findUnique({
    where: {
      id: Number(id),
    },
  })
  if (player === null) {
    throw new Error('Player not found !')
  }
  return player
}

export const deletePlayerService = async (
  id: number
): Promise<player | null> => {
  const player = await getPlayerByIdService(id)
  if (player === null) {
    throw new Error('Player not found !')
  }
  return await prisma.player.delete({
    where: {
      id: Number(id),
    },
  })
}
