import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const addUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    await prisma.user.create({
      data: {
        name: username,
        password: password,
      },
    })
    return res.send('User added')
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany()
    return res.send(users)
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const { username, password } = req.body
    await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name: username,
        password: password,
      },
    })
    return res.send('Updated user')
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    })
    return res.send('Deleted user')
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}
