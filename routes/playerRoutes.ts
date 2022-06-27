import express, { Router } from 'express'

import {
  addPlayer,
  getPlayers,
  updatePlayer,
  deletePlayer,
} from '../controllers/playerController'
export const router: Router = express.Router()

router.post('/', addPlayer)
router.get('/', getPlayers)
router.put('/:id', updatePlayer)
router.delete('/:id', deletePlayer)
