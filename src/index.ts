import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { router as playerRoutes } from '../routes/playerRoutes'
import { router as teamRoutes } from '../routes/teamRoutes'
import { PrismaClient } from '@prisma/client'
import { Logger } from './lib/logger'

const prisma = new PrismaClient()
export default prisma

export const app = express()
dotenv.config()

const { API_PORT } = process.env
const port = process.env.PORT || API_PORT

app.use(bodyParser.json())

app.use('/player', playerRoutes)
app.use('/team', teamRoutes)
app.listen(port, () => {
  return Logger.debug(`Express is listening at http://localhost:${port}`)
})
