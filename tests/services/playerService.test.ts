import * as players from '../../services/playerService'
import * as data from '../data/data.json'

describe('Tests for player service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('service to add player to database success', async () => {
    const mockAddPlayer = jest
      .spyOn(players, 'addPlayerService')
      .mockResolvedValueOnce(data.addPlayerSuccess)
    const result = await players.addPlayerService('vansh', 'india')
    expect(mockAddPlayer).toHaveBeenCalledTimes(1)
    expect(result).toEqual(data.addPlayerSuccess)
  })

  it('service to add player to database failure', async () => {
    try {
      const mockAddPlayer = jest
        .spyOn(players, 'addPlayerService')
        .mockRejectedValue('No player created !')
      const result = await players.addPlayerService('vansh', 'india')
      expect(mockAddPlayer).toHaveBeenCalledTimes(1)
      expect(result).rejects.toThrow('No player created !')
    } catch (error) {
      console.log(error)
    }
  })

  it('returns all players success', async () => {
    const mockGetAllPlayers = jest
      .spyOn(players, 'getPlayersService')
      .mockResolvedValueOnce(data.getPlayersSuccess)
    const result = players.getPlayersService()
    expect(await result).toBe(data.getPlayersSuccess)
    expect(mockGetAllPlayers).toBeCalledTimes(1)
  })

  it('returns all players failure', async () => {
    try {
      const mockGetAllPlayers = jest
        .spyOn(players, 'getPlayersService')
        .mockRejectedValueOnce('No players found')
      const result = players.getPlayersService()
      expect(mockGetAllPlayers).toBeCalledTimes(1)
      expect(await result).rejects.toThrowError('No players found')
    } catch (error) {
      console.log(error)
    }
  })

  it('returns player by id success', async () => {
    const mockGetPlayerById = jest
      .spyOn(players, 'getPlayerByIdService')
      .mockResolvedValueOnce(data.getPlayerByIdSuccess)
    const result = players.getPlayerByIdService(1)
    expect(mockGetPlayerById).toBeCalledTimes(1)
    expect(await result).toBe(data.getPlayerByIdSuccess)
  })

  it('returns player by id failure', async () => {
    try {
      const mockGetPlayerById = jest
        .spyOn(players, 'getPlayerByIdService')
        .mockRejectedValueOnce('Player not found !')
      const result = players.getPlayerByIdService(1)
      expect(mockGetPlayerById).toBeCalledTimes(1)
      expect(await result).rejects.toThrowError('Player not found !')
    } catch (error) {
      console.log(error)
    }
  })

  it('service to delete player success', async () => {
    const mockDeletedPlayer = jest
      .spyOn(players, 'deletePlayerService')
      .mockResolvedValueOnce(data.deletePlayerSuccess)
    const mockPlayerToBeDeleted = jest
      .spyOn(players, 'getPlayerByIdService')
      .mockResolvedValueOnce(data.deletePlayerSuccess)
    const result = await players.deletePlayerService(1)
    expect(mockPlayerToBeDeleted).toBeCalledTimes(0)
    expect(mockDeletedPlayer).toBeCalledTimes(1)
    expect(result).toBe(data.deletePlayerSuccess)
  })

  it('service to delete player failure', async () => {
    try {
      const mockDeletedPlayer = jest
        .spyOn(players, 'deletePlayerService')
        .mockRejectedValueOnce('Player not found !')
      const mockPlayerToBeDeleted = jest
        .spyOn(players, 'getPlayerByIdService')
        .mockResolvedValueOnce(null)
      const result = await players.deletePlayerService(1)
      expect(mockPlayerToBeDeleted).toBeCalledTimes(0)
      expect(mockDeletedPlayer).toBeCalledTimes(1)
      expect(result).toBe('Player not found !')
    } catch (error) {
      console.log(error)
    }
  })

  it('service to update player success', async () => {
    const mockUpdatedPlayer = jest
      .spyOn(players, 'updatePlayerService')
      .mockResolvedValueOnce(data.updatePlayerSuccess)
    const result = players.updatePlayerService(1, 'ansh', 'india')
    expect(await result).toBe(data.updatePlayerSuccess)
    expect(mockUpdatedPlayer).toBeCalledTimes(1)
  })

  it('service to update player failure', async () => {
    try {
      const mockUpdatedPlayer = jest
        .spyOn(players, 'updatePlayerService')
        .mockRejectedValueOnce('Player not updated !')
      const result = players.updatePlayerService(1, 'ansh', 'india')
      expect(await result).rejects.toThrowError('Player not updated !')
      expect(mockUpdatedPlayer).toBeCalledTimes(1)
    } catch (error) {
      console.log(error)
    }
  })
})
