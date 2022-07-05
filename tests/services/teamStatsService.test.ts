import * as teamStats from '../../services/teamStatsService'
import * as data from '../data/data.json'

describe('Tests for teamstats service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns all team stats success', async () => {
    const mockGetTeamStats = jest
      .spyOn(teamStats, 'getTeamStatsService')
      .mockResolvedValueOnce(data.getTeamStatsSuccess)
    const result = teamStats.getTeamStatsService(1)
    expect(await result).toBe(data.getTeamStatsSuccess)
    expect(mockGetTeamStats).toBeCalledTimes(1)
  })

  it('returns all team stats failure', async () => {
    try {
      const mockGetTeamStats = jest
        .spyOn(teamStats, 'getTeamStatsService')
        .mockRejectedValueOnce('Team not found')
      const result = teamStats.getTeamStatsService(1)
      expect(await result).toThrowError('Team not found')
      expect(mockGetTeamStats).toBeCalledTimes(1)
    } catch (error) {
      console.log(error)
    }
  })

  it('service to update team stats success', async () => {
    const mockGetTeamStats = jest
      .spyOn(teamStats, 'updateTeamStatsService')
      .mockResolvedValueOnce(0)
    const result = teamStats.updateTeamStatsService(1, 8, 6)
    expect(await result).toBe(0)
    expect(mockGetTeamStats).toBeCalledTimes(1)
  })

  it('service to update team stats failure', async () => {
    try {
      const mockGetTeamStats = jest
        .spyOn(teamStats, 'updateTeamStatsService')
        .mockRejectedValueOnce('Data not valid')
      const result = teamStats.updateTeamStatsService(1, 9, 6)
      expect(await result).toThrowError('Data not valid')
      expect(mockGetTeamStats).toBeCalledTimes(1)
    } catch (error) {
      console.log(error)
    }
  })
})
