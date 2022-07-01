import express, { Router } from 'express'

import { addTeam, getTeams, deleteTeam } from '../controllers/teamController'
import {
  updateTeamStats,
  getTeamStats,
} from '../controllers/teamStatsController'

export const router: Router = express.Router()

router.post('/', addTeam)
router.get('/', getTeams)
router.delete('/:teamId', deleteTeam)

router.post('/stats/:id', updateTeamStats)
router.get('/stats/:id', getTeamStats)
