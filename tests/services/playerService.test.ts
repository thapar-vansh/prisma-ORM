import * as players from '../../services/playerService'
import * as data from '../data/data.json'

describe('Tests for player service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('service to add player to database success', async () => {
    const mockAddPlayer = jest
      .spyOn(players, 'addPlayerService')
      .mockResolvedValueOnce(0)
    const result = await players.addPlayerService('vansh', 'india')
    expect(mockAddPlayer).toHaveBeenCalledTimes(1)
    expect(result).toEqual(0)
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
      expect(await result).toThrowError('No players found')
    } catch (error) {
      console.log(error)
    }
  })

  it('service to delete player success', async () => {
    const mockDeletedPlayer = jest
      .spyOn(players, 'deletePlayerService')
      .mockResolvedValueOnce(0)
    const result = players.deletePlayerService(1)
    expect(await result).toBe(0)
    expect(mockDeletedPlayer).toBeCalledTimes(1)
  })

  it('service to delete player failure', async () => {
    try {
      const mockDeletedPlayer = jest
        .spyOn(players, 'deletePlayerService')
        .mockRejectedValueOnce('No player found')
      const result = players.deletePlayerService(199)
      expect(await result).toThrowError('No player found')
      expect(mockDeletedPlayer).toBeCalledTimes(1)
    } catch (error) {
      console.log(error)
    }
  })

  it('service to update player success', async () => {
    const mockupdatedPlayer = jest
      .spyOn(players, 'updatePlayerService')
      .mockResolvedValueOnce(0)
    const result = players.updatePlayerService(1, 'ansh', 'india')
    expect(await result).toBe(0)
    expect(mockupdatedPlayer).toBeCalledTimes(1)
  })

  it('service to update player when id does not exist success', async () => {
    const mockupdatedPlayer = jest
      .spyOn(players, 'updatePlayerService')
      .mockResolvedValueOnce(0)
    const result = players.updatePlayerService(199, 'ansh', 'india')
    expect(await result).toBe(0)
    expect(mockupdatedPlayer).toBeCalledTimes(1)
  })
})
