import * as players from '../../services/playerService'
import * as data from '../data/data.json'
import prisma from '../../src/index'

describe('Tests for player service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('service to add player to database success', async () => {
    const mockAddPlayer = jest
      .spyOn(prisma.player, 'create')
      .mockResolvedValueOnce(data.addPlayerSuccess)
    const result = await players.addPlayerService('vansh', 'india')
    expect(mockAddPlayer).toHaveBeenCalledTimes(1)
    expect(result).toEqual(data.addPlayerSuccess)
  })

  it('service to add player to database failure', async () => {
    const mockAddPlayer = jest
      .spyOn(prisma.player, 'create')
      .mockRejectedValueOnce('No player created !')
    const result = players.addPlayerService('vansh', 'india')
    expect(mockAddPlayer).toHaveBeenCalledTimes(1)
    await expect(result).rejects.toEqual('No player created !')
  })

  it('returns all players success', async () => {
    const mockGetAllPlayers = jest
      .spyOn(prisma.player, 'findMany')
      .mockResolvedValueOnce(data.getPlayersSuccess)
    const result = players.getPlayersService()
    expect(await result).toBe(data.getPlayersSuccess)
    expect(mockGetAllPlayers).toBeCalledTimes(1)
  })

  it('returns all players failure', async () => {
    const mockGetAllPlayers = jest
      .spyOn(prisma.player, 'findMany')
      .mockRejectedValueOnce('No players found')
    const result = players.getPlayersService()
    expect(mockGetAllPlayers).toBeCalledTimes(1)
    await expect(result).rejects.toEqual('No players found')
  })

  it('returns player by id success', async () => {
    const mockGetPlayerById = jest
      .spyOn(prisma.player, 'findUnique')
      .mockResolvedValueOnce(data.getPlayerByIdSuccess)
    const result = players.getPlayerByIdService(1)
    expect(mockGetPlayerById).toBeCalledTimes(1)
    expect(await result).toBe(data.getPlayerByIdSuccess)
  })

  it('returns player by id failure', async () => {
    const mockGetPlayerById = jest
      .spyOn(prisma.player, 'findUnique')
      .mockRejectedValueOnce('Player not found !')
    const result = players.getPlayerByIdService(1)
    expect(mockGetPlayerById).toBeCalledTimes(1)
    await expect(result).rejects.toEqual('Player not found !')
  })

  it('service to delete player success', async () => {
    const mockDeletedPlayer = jest
      .spyOn(players, 'getPlayerByIdService')
      .mockResolvedValueOnce(data.deletePlayerSuccess)
    const mockPlayerToBeDeleted = jest
      .spyOn(prisma.player, 'delete')
      .mockResolvedValueOnce(data.deletePlayerSuccess)
    const result = await players.deletePlayerService(1)
    expect(mockPlayerToBeDeleted).toBeCalledTimes(1)
    expect(mockDeletedPlayer).toBeCalledTimes(1)
    expect(result).toBe(data.deletePlayerSuccess)
  })

  it('service to delete player failure', async () => {
    const mockDeletedPlayer = jest
      .spyOn(players, 'getPlayerByIdService')
      .mockRejectedValueOnce('Player not found !')
    const result = players.deletePlayerService(1)
    expect(mockDeletedPlayer).toBeCalledTimes(1)
    await expect(result).rejects.toEqual('Player not found !')
  })

  it('service to update player success', async () => {
    const mockUpdatedPlayer = jest
      .spyOn(prisma.player, 'upsert')
      .mockResolvedValueOnce(data.updatePlayerSuccess)
    const result = players.updatePlayerService(1, 'ansh', 'india')
    expect(await result).toBe(data.updatePlayerSuccess)
    expect(mockUpdatedPlayer).toBeCalledTimes(1)
  })

  it('service to update player failure', async () => {
    const mockUpdatedPlayer = jest
      .spyOn(prisma.player, 'upsert')
      .mockRejectedValueOnce('Player not updated !')
    const result = players.updatePlayerService(1, 'ansh', 'india')
    expect(mockUpdatedPlayer).toBeCalledTimes(1)
    await expect(result).rejects.toEqual('Player not updated !')
  })
})
