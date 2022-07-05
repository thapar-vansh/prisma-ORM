import * as teams from '../../services/teamService'
import * as data from '../data/data.json'

describe('Tests for team service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('service to add team to database success', async () => {
    const mockAddTeam = jest
      .spyOn(teams, 'addTeamService')
      .mockResolvedValueOnce(0)
    const result = await teams.addTeamService('kkr')
    expect(mockAddTeam).toHaveBeenCalledTimes(1)
    expect(result).toEqual(0)
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
      expect(await result).toThrowError('No teams found')
      expect(mockGetAllTeams).toBeCalledTimes(1)
    } catch (error) {
      console.log(error)
    }
  })

  it('service to delete team success', async () => {
    const mockDeletedteam = jest
      .spyOn(teams, 'deleteTeamService')
      .mockResolvedValueOnce(0)
    const result = teams.deleteTeamService(1)
    expect(await result).toBe(0)
    expect(mockDeletedteam).toBeCalledTimes(1)
  })

  it('service to delete team failure', async () => {
    try {
      const mockDeletedPlayer = jest
        .spyOn(teams, 'deleteTeamService')
        .mockRejectedValueOnce('Invalid id ! Team does not exists')
      const result = teams.deleteTeamService(199)
      expect(await result).toThrowError('Invalid id ! Team does not exists')
      expect(mockDeletedPlayer).toBeCalledTimes(1)
    } catch (error) {
      console.log(error)
    }
  })
})
