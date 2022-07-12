import * as teams from '../../services/teamService'
import * as teamStats from '../../services/teamStatsService'
import * as data from '../data/data.json'
import prisma from '../../src/index'

describe('Tests for team service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('service to add team to database success', async () => {
    const mockAddTeamStats = jest
      .spyOn(teamStats, 'addTeamStats')
      .mockResolvedValueOnce(data.addTeamStatsSuccess)
    const mockAddTeam = jest
      .spyOn(prisma.team, 'create')
      .mockResolvedValueOnce(data.addTeamSuccess)
    const result = teams.addTeamService('kkr')
    expect(mockAddTeam).toHaveBeenCalledTimes(0)
    expect(mockAddTeamStats).toHaveBeenCalledTimes(1)
    expect(await result).toEqual(data.addTeamSuccess)
  })

  it('service to add team to database failure', async () => {
    try {
      const mockAddTeamStats = jest
        .spyOn(teamStats, 'addTeamStats')
        .mockRejectedValueOnce('No stats created !')
      const mockAddTeam = jest
        .spyOn(prisma.team, 'create')
        .mockRejectedValueOnce('No team created !')
      const result = await teams.addTeamService('kkr')
      expect(mockAddTeam).toHaveBeenCalledTimes(1)
      expect(mockAddTeamStats).toHaveBeenCalledTimes(0)
      expect(result).toThrow('No stats created !')
    } catch (e) {
      console.log(e)
    }
  })

  it('returns all teams success', async () => {
    const mockGetAllTeams = jest
      .spyOn(prisma.team, 'findMany')
      .mockResolvedValueOnce(data.getTeamsSuccess)
    const result = teams.getTeamsService()
    expect(await result).toBe(data.getTeamsSuccess)
    expect(mockGetAllTeams).toBeCalledTimes(1)
  })

  it('returns all teams failure', async () => {
    const mockGetAllTeams = jest
      .spyOn(prisma.team, 'findMany')
      .mockRejectedValueOnce('No teams found')
    const result = teams.getTeamsService()
    await expect(result).rejects.toEqual('No teams found')
    expect(mockGetAllTeams).toBeCalledTimes(1)
  })

  it('service to delete team success', async () => {
    const mockTeamToBeDeleted = jest
      .spyOn(teamStats, 'getTeamStatsService')
      .mockResolvedValueOnce(data.deleteTeamStatsSuccess)
    const mockDeletedTeam = jest
      .spyOn(prisma.team, 'delete')
      .mockResolvedValueOnce(data.deleteTeamSuccess)
    const mockDeletedTeamStats = jest
      .spyOn(prisma.team_stats, 'delete')
      .mockResolvedValueOnce(data.deleteTeamStatsSuccess)
    const result = teams.deleteTeamService(1)
    expect(await result).toBe(data.deleteTeamStatsSuccess)
    expect(mockTeamToBeDeleted).toBeCalledTimes(1)
    expect(mockDeletedTeamStats).toBeCalledTimes(1)
    expect(mockDeletedTeam).toBeCalledTimes(1)
  })

  it('service to delete team failure', async () => {
    const mockTeamToBeDeleted = jest
      .spyOn(teamStats, 'getTeamStatsService')
      .mockRejectedValueOnce('Team not found')
    const mockDeletedTeam = jest
      .spyOn(prisma.team, 'delete')
      .mockResolvedValueOnce(data.deleteTeamSuccess)
    const mockDeletedTeamStats = jest
      .spyOn(prisma.team_stats, 'delete')
      .mockRejectedValueOnce('No stats deleted !')
    const result = teams.deleteTeamService(1)
    await expect(result).rejects.toEqual('Team not found')
    expect(mockTeamToBeDeleted).toBeCalledTimes(1)
    expect(mockDeletedTeam).toBeCalledTimes(0)
    expect(mockDeletedTeamStats).toBeCalledTimes(0)
  })
})
