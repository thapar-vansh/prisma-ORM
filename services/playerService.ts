import prisma from '../src/index'
import { player } from '@prisma/client'

export const addPlayerService = async (
  name: string,
  country: string
): Promise<number> => {
  await prisma.player.create({
    data: {
      name: name as string,
      country: country as string,
    },
  })
  return 0
}

export const getPlayersService = async (): Promise<player[]> => {
  const players: player[] = await prisma.player.findMany()
  if (players.length === 0) {
    throw new Error('No players found')
  }
  return players
}

export const updatePlayerService = async (
  id: number,
  name: string,
  country: string
): Promise<number> => {
  await prisma.player.upsert({
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
  return 0
}

export const deletePlayerService = async (id: number): Promise<number> => {
  const player = getPlayerByIdService(id)
  if (player === null) {
    throw new Error('No player found')
  }
  await prisma.player.delete({
    where: {
      id: Number(id),
    },
  })
  return 0
}

const getPlayerByIdService = async (id: number) => {
  const player = await prisma.player.findUnique({
    where: {
      id: Number(id),
    },
  })
  console.log(player)
}
