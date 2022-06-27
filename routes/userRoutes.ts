import express, { Router } from 'express'

import {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
} from '../controllers/userController'
export const router: Router = express.Router()

router.post('/', addUser)
router.get('/', getUsers)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
