import { prisma } from '../src/index'
import { Player } from '@prisma/client'

export const addPlayerService = async (
  name: string,
  country: string
): Promise<void> => {
  await prisma.player.create({
    data: {
      name: name as string,
      country: country as string,
    },
  })
}

export const getPlayersService = async (): Promise<Player[]> => {
  const players: Player[] = await prisma.player.findMany()
  if (players.length === 0) {
    throw new Error('No players found')
  }
  return players
}

export const updatePlayerService = async (
  id: number,
  name: string,
  country: string
): Promise<void> => {
  await prisma.player.update({
    where: {
      id: Number(id),
    },
    data: {
      name: name as string,
      country: country as string,
    },
  })
}

export const deletePlayerService = async (id: number): Promise<void> => {
  await prisma.player.delete({
    where: {
      id: Number(id),
    },
  })
}
