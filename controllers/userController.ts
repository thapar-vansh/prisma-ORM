import { users } from '@prisma/client'
import { Request, Response } from 'express'
import { loginUser, registerUser } from '../services/userServices'

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, password, type } = req.body.input
  if (!username && !password) {
    return res.status(422).send('Input required')
  }
  try {
    const result: users = await registerUser(username, password, type)
    return res.status(200).json({ id: result.id })
  } catch (e) {
    console.log(e)
    return res.status(400).send('Registration failed')
  }
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body.input
  if (!username && !password) {
    return res.status(422).send('Input required')
  }
  try {
    const result: string = await loginUser(username, password)
    res.status(200).json({ accessToken: result })
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}
