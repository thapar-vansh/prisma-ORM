import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { router as userRoutes } from '../routes/userRoutes'
import { router as playerRoutes } from '../routes/playerRoutes'

const app = express()
dotenv.config()

const { API_PORT } = process.env
const port = process.env.PORT || API_PORT

app.use(bodyParser.json())

app.use('/player', playerRoutes)
app.use('/user', userRoutes)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost :${port}`)
})
