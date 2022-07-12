import * as teamStats from '../../services/teamStatsService'
import * as data from '../data/data.json'
import prisma from '../../src/index'

describe('Tests for teamstats service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns team stats success', async () => {
    const mockGetTeamStats = jest
      .spyOn(prisma.team_stats, 'findUnique')
      .mockResolvedValueOnce(data.getTeamStatsSuccess)
    const result = teamStats.getTeamStatsService(1)
    expect(await result).toBe(data.getTeamStatsSuccess)
    expect(mockGetTeamStats).toBeCalledTimes(1)
  })

  it('returns all team stats failure', async () => {
    const mockGetTeamStats = jest
      .spyOn(prisma.team_stats, 'findUnique')
      .mockRejectedValueOnce('Team not found')
    const result = teamStats.getTeamStatsService(1)
    await expect(result).rejects.toEqual('Team not found')
    expect(mockGetTeamStats).toBeCalledTimes(1)
  })

  it('service to update team stats success', async () => {
    const mockUpdateTeamStats = jest
      .spyOn(prisma.team_stats, 'update')
      .mockResolvedValueOnce(data.updateTeamStatsSuccess)
    const result = teamStats.updateTeamStatsService(1, 8, 6)
    expect(await result).toBe(data.updateTeamStatsSuccess)
    expect(mockUpdateTeamStats).toBeCalledTimes(1)
  })

  it('service to update team stats failure', async () => {
    const mockUpdateTeamStats = jest
      .spyOn(teamStats, 'updateTeamStatsService')
      .mockRejectedValueOnce('Data not valid')
    const result = teamStats.updateTeamStatsService(1, 9, 6)
    await expect(result).rejects.toEqual('Data not valid')
    expect(mockUpdateTeamStats).toBeCalledTimes(1)
  })

  it('service to delete team success', async () => {
    const mockDeletedTeamStats = jest
      .spyOn(prisma.team_stats, 'delete')
      .mockResolvedValueOnce(data.deleteTeamStatsSuccess)
    const result = teamStats.deleteTeamStats(1)
    expect(await result).toBe(data.deleteTeamStatsSuccess)
    expect(mockDeletedTeamStats).toBeCalledTimes(1)
  })

  it('service to delete team failure', async () => {
    const mockDeletedTeamStats = jest
      .spyOn(prisma.team_stats, 'delete')
      .mockRejectedValueOnce('No stats deleted !')
    const result = teamStats.deleteTeamStats(1)
    await expect(result).rejects.toEqual('No stats deleted !')
    expect(mockDeletedTeamStats).toBeCalledTimes(1)
  })
})
