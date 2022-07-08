import * as teams from '../../services/teamService'
import * as teamStats from '../../services/teamStatsService'
import * as data from '../data/data.json'

describe('Tests for team service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('service to add team to database success', async () => {
    const mockAddTeamStats = jest
      .spyOn(teamStats, 'addTeamStats')
      .mockResolvedValueOnce(data.addTeamStatsSuccess)
    const mockAddTeam = jest
      .spyOn(teams, 'addTeamService')
      .mockResolvedValueOnce(data.addTeamSuccess)
    const result = teams.addTeamService('kkr')
    expect(mockAddTeam).toHaveBeenCalledTimes(1)
    expect(mockAddTeamStats).toHaveBeenCalledTimes(0)
    expect(await result).toEqual(data.addTeamSuccess)
  })

  it('service to add team to database failure', async () => {
    try {
      const mockAddTeamStats = jest
        .spyOn(teamStats, 'addTeamStats')
        .mockResolvedValueOnce(data.addTeamStatsSuccess)
      const mockAddTeam = jest
        .spyOn(teams, 'addTeamService')
        .mockRejectedValueOnce('No team created !')
      const result = teams.addTeamService('kkr')
      expect(mockAddTeam).toHaveBeenCalledTimes(1)
      expect(mockAddTeamStats).toHaveBeenCalledTimes(0)
      expect(await result).rejects.toThrowError('No team created !')
    } catch (error) {
      console.log(error)
    }
  })

  it('returns all teams success', async () => {
    const mockGetAllTeams = jest
      .spyOn(teams, 'getTeamsService')
      .mockResolvedValueOnce(data.getTeamsSuccess)
    const result = teams.getTeamsService()
    expect(await result).toBe(data.getTeamsSuccess)
    expect(mockGetAllTeams).toBeCalledTimes(1)
  })

  it('returns all teams failure', async () => {
    try {
      const mockGetAllTeams = jest
        .spyOn(teams, 'getTeamsService')
        .mockRejectedValueOnce('No teams found')
      const result = teams.getTeamsService()
      expect(await result).rejects.toThrowError('No teams found')
      expect(mockGetAllTeams).toBeCalledTimes(1)
    } catch (error) {
      console.log(error)
    }
  })

  it('service to delete team success', async () => {
    const mockDeletedTeam = jest
      .spyOn(teams, 'deleteTeamService')
      .mockResolvedValueOnce(data.deleteTeamSuccess)
    const mockDeletedTeamStats = jest
      .spyOn(teamStats, 'deleteTeamStats')
      .mockResolvedValueOnce(data.deleteTeamStatsSuccess)
    const result = teams.deleteTeamService(1)
    expect(await result).toBe(data.deleteTeamSuccess)
    expect(mockDeletedTeam).toBeCalledTimes(1)
    expect(mockDeletedTeamStats).toBeCalledTimes(0)
  })

  it('service to delete team failure', async () => {
    try {
      const mockDeletedTeam = jest
        .spyOn(teams, 'deleteTeamService')
        .mockRejectedValueOnce('Invalid id ! Team does not exists')
      const mockDeletedTeamStats = jest
        .spyOn(teamStats, 'deleteTeamStats')
        .mockResolvedValueOnce(data.deleteTeamStatsSuccess)
      const result = teams.deleteTeamService(1)
      expect(await result).rejects.toThrowError(
        'Invalid id ! Team does not exists'
      )
      expect(mockDeletedTeam).toBeCalledTimes(1)
      expect(mockDeletedTeamStats).toBeCalledTimes(0)
    } catch (error) {
      console.log(error)
    }
  })
})
